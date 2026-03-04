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
            ->where('paid_at_binario', '<=', Carbon::now('America/La_Paz'))
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
                    ? User::with('activeTransaction')->find(
                        $usuario->left_son_id
                    )
                    : null;

                //obtener hijo derecho directo del usuario
                $rightUser = $usuario->right_son_id
                    ? User::with('activeTransaction')->find(
                        $usuario->right_son_id
                    )
                    : null;

                //si no tiene los 2 referidos directos, no se paga pirámide
                if (!$leftUser || !$rightUser) {
                    Log::info(
                        "Usuario #{$usuario->id} no tiene ambos hijos directos para pirámide. Se omite."
                    );
                    return;
                }

                $leftTx = $leftUser?->activeTransaction;
                $rightTx = $rightUser?->activeTransaction;

                $montoBase = null;

                //calcular el lado menor activo entre los hijos directos
                if ($leftTx && $rightTx) {

                // si ambos hijos tienen transacción activa, se toma el menor valor de paquete entre los dos para calcular la comisión, y se registra el from_user_id como el hijo que genera la comisión (el lado menor)
                    if (
                        (float) $leftTx->paquete_valor <=
                        (float) $rightTx->paquete_valor
                    ) {
                        $montoBase = (float) $leftTx->paquete_valor;
                        $fromUserId = $leftUser->id; // lado izquierdo es menor
                    } else {
                        $montoBase = (float) $rightTx->paquete_valor;
                        $fromUserId = $rightUser->id; // lado derecho es menor
                    }

                } elseif ($leftTx) {
                    $montoBase = (float) $leftTx->paquete_valor;
                    $fromUserId = $leftUser->id; // si solo el hijo izquierdo tiene transacción activa, se toma su valor de paquete para calcular la comisión, y se registra el from_user_id como el hijo izquierdo
                } elseif ($rightTx) {
                    $montoBase = (float) $rightTx->paquete_valor;
                    $fromUserId = $rightUser->id; // si solo el hijo derecho tiene transacción activa, se toma su valor de paquete para calcular la comisión, y se registra el from_user_id como el hijo derecho
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
                        'user_id' => $usuario->id, // el receptor de la comisión es el usuario actual del ciclo
                        'from_user_id' => $fromUserId, // el generador de la comisión es el hijo directo con el menor paquete activo
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

                    // Actualizar la fecha de pago binario para el próximo mes (versión segura)
                    $transaccion->update([
                        'paid_at_binario' => $transaccion->paid_at_binario
                            ? Carbon::parse(
                                $transaccion->paid_at_binario
                            )->addMonth()
                            : now('America/La_Paz')->addMonth(),
                    ]);
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
