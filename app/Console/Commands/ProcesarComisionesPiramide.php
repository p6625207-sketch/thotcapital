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
        $niveles = PiramideNivel::orderBy('nivel')->pluck(
            'porcentaje',
            'nivel'
        );

        if ($niveles->isEmpty()) {
            $this->warn('No hay niveles de pirámide configurados.');
            return Command::FAILURE;
        }

        // Misma condición que ProcesarPagosMensuales: transacciones activas vencidas
        $transacciones = Transaction::where('is_active', true)
            ->where('paid_at', '<=', Carbon::now())
            ->with('user')
            ->get();

        $procesados = 0;
        $pagados = 0;
        $today = Carbon::now('America/La_Paz')->toDateString();

        foreach ($transacciones as $transaccion) {

            $usuario = $transaccion->user;
            if (!$usuario) {
                continue;
            }

            DB::transaction(function () use (
                $usuario,
                $transaccion,
                $niveles,
                $today,
                &$pagados
            ) {
                //
                $nivelUsuario = $usuario->nivel;

                if (!isset($niveles[$nivelUsuario])) {
                    Log::warning(
                        "Usuario #{$usuario->id} tiene nivel {$nivelUsuario} sin porcentaje configurado. Se omite pirámide."
                    );
                    return;
                }

                $porcentaje = (float) $niveles[$nivelUsuario];

                //obtener hijo izquierdo directo del usuario
                $leftUser = $usuario->left_son_id
                ?User::with('activeTransaction')->find($usuario->left_son_id)
                : null;

                //obtener hijo derecho directo del usuario
                $rightUser = $usuario->right_son_id
                ?User::with('activeTransaction')->find($usuario->right_son_id)
                : null;

                $leftTx = $leftUser?->activeTransaction;
                $rightTx = $rightUser?->activeTransaction;

                $montoBase = null;

                //calcular el lado menor activo entre los hijos directos
                if ($leftTx && $rightTx) {
                    $montoBase = min(
                        (float) $leftTx->paquete_valor,
                        (float) $rightTx->paquete_valor
                    );
                } elseif ($leftTx) {
                    $montoBase = (float) $leftTx->paquete_valor;
                } elseif ($rightTx) {
                    $montoBase = (float) $rightTx->paquete_valor;
                }

                if ($montoBase === null || $montoBase <= 0) {
                    // No hay base para comisión, se omite pirámide
                    Log::info(
                        "Usuario #{$usuario->id} no tiene hijos activos para pirámide. Se omite."
                    );
                    return;
                }

                //calcular comisión bruta
                $comisionBruta = $montoBase * ($porcentaje / 100);

                //aplicar capping diario y límite global usando WalletService
                $montoFinal = $this->walletService->procesarPagoComision(
                    $transaccion,
                    $comisionBruta
                );

                if (!is_null($montoFinal) && $montoFinal > 0) {
                    $usuario->increment('wallet_balance', $montoFinal);

                    DB::table('comisions')->insert([
                        'user_id' => $usuario->id,
                        'from_user_id' => $usuario->id,
                        'transaction_id' => $transaccion->id,
                        'amount' => $montoFinal,
                        'created_at' => now('America/La_Paz'),
                        'updated_at' => now('America/La_Paz'),
                    ]);

                    $pagados++;

                     Log::info(
                        "BINARIO NIVEL {$nivelUsuario}: Usuario #{$usuario->id} cobró {$montoFinal} " .
                        "(Base {$montoBase} × {$porcentaje}%)"
                    );

                    $pagados++;

                }

            });

            $procesados++;
        }

        $this->info('Proceso completado.');
        $this->info(" Transacciones recorridas : {$procesados}");
        $this->info(" Comisiones pagadas        : {$pagados}");

        return Command::SUCCESS;
    }
}
