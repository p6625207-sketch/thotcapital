<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Transaction;
use App\Models\User;
use App\Models\PiramideNivel;
use App\Services\WalletService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcesarComisionesPiramide extends Command
{
    protected $signature = 'app:procesar-comisiones-piramide';
    protected $description = 'Procesa comisiones de pirámide: por cada transacción activa vencida sube hasta 8 niveles pagando al padre según el menor lado activo de sus hijos directos.';

    public function __construct(protected WalletService $walletService)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        // Cargamos los porcentajes por nivel (nivel 1 = hijo directo, nivel 2 = nieto, etc.)
        $niveles = PiramideNivel::orderBy('nivel')->pluck('porcentaje', 'nivel');

        if ($niveles->isEmpty()) {
            $this->warn('No hay niveles de pirámide configurados.');
            return Command::FAILURE;
        }

        // Misma condición que ProcesarPagosMensuales: transacciones activas vencidas
        $transacciones = Transaction::where('is_active', true)
            ->where('paid_at', '<=', Carbon::now())
            ->with('user')
            ->get();

        $procesados        = 0;
        $comisionesPagadas = 0;
        $today             = Carbon::now('America/La_Paz')->toDateString();

        foreach ($transacciones as $transaccion) {
            $hijoUser = $transaccion->user;
            if (!$hijoUser) continue;

            DB::transaction(function () use (
                $hijoUser, $niveles, $today, &$procesados, &$comisionesPagadas
            ) {
                $currentUser = $hijoUser;

                // Recorremos hasta 8 niveles hacia arriba
                for ($nivel = 1; $nivel <= 8; $nivel++) {
                    if (!$currentUser->parent_id) break;

                    $padre = User::lockForUpdate()->find($currentUser->parent_id);
                    if (!$padre) break;

                    $padreTransaction = $padre->activeTransaction;

                    // El padre debe tener paquete activo para cobrar comisión
                    if ($padreTransaction && isset($niveles[$nivel])) {

                        // Evitar doble pago en el mismo día para este padre
                        $yaPagado = DB::table('comisions')
                            ->where('transaction_id', $padreTransaction->id)
                            ->where('tipo', 'like', 'piramide_%')
                            ->whereDate('created_at', $today)
                            ->exists();

                        if (!$yaPagado) {
                            // Comparar hijos directos izquierdo y derecho del padre
                            $leftUser  = $padre->left_son_id  ? User::find($padre->left_son_id)  : null;
                            $rightUser = $padre->right_son_id ? User::find($padre->right_son_id) : null;

                            $leftTx  = $leftUser?->activeTransaction;
                            $rightTx = $rightUser?->activeTransaction;

                            $montoBase = null;

                            if ($leftTx && $rightTx) {
                                // Ambos lados activos → base = paquete_valor del lado menor
                                $montoBase = min(
                                    (float) $leftTx->paquete_valor,
                                    (float) $rightTx->paquete_valor
                                );
                            } elseif ($leftTx) {
                                // Solo lado izquierdo activo
                                $montoBase = (float) $leftTx->paquete_valor;
                            } elseif ($rightTx) {
                                // Solo lado derecho activo
                                $montoBase = (float) $rightTx->paquete_valor;
                            }

                            if ($montoBase !== null && $montoBase > 0) {
                                $porcentaje    = (float) $niveles[$nivel];
                                $comisionBruta = $montoBase * ($porcentaje / 100);

                                // Aplicar capping diario (200%) y límite global (300%) via WalletService
                                $montoFinal = $this->walletService->procesarPagoComision(
                                    $padreTransaction,
                                    $comisionBruta
                                );

                                if (!is_null($montoFinal) && $montoFinal > 0) {
                                    $padre->increment('wallet_balance', $montoFinal);

                                    DB::table('comisions')->insert([
                                        'user_id'        => $padre->id,
                                        'from_user_id'   => $hijoUser->id,
                                        'transaction_id' => $padreTransaction->id,
                                        'amount'         => $montoFinal,
                                        'tipo'           => 'piramide_nivel_' . $nivel,
                                        'created_at'     => now('America/La_Paz'),
                                        'updated_at'     => now('America/La_Paz'),
                                    ]);

                                    $comisionesPagadas++;

                                    Log::info(
                                        "PIRAMIDE N{$nivel}: Padre #{$padre->id} cobró " .
                                        "\${$montoFinal} (base \${$montoBase} × {$porcentaje}%). " .
                                        "Origen hijo #{$hijoUser->id}."
                                    );
                                }
                            }
                        }
                    }

                    $currentUser = $padre;
                }
            });

            $procesados++;
        }

        $this->info("Proceso completado.");
        $this->info(" Transacciones recorridas : {$procesados}");
        $this->info(" Comisiones pagadas        : {$comisionesPagadas}");

        return Command::SUCCESS;
    }
}
