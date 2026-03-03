<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\WalletService;

class ProcesarPagosMensuales extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:procesar-pagos-mensuales';

    /**
     * Procesa los rendimientos diarios de las transacciones activas.
     */

    /**
     * Descripción del comando.
     */
    protected $description = 'Procesa los rendimientos mensuales de las inversiones activas.';

    public function handle(WalletService $walletService)
    {

        $transacciones = Transaction::where('is_active', true)
            ->where('paid_at', '<=', Carbon::now())
            ->with('user')
            ->get();

        $procesados = 0;

        $paquetesCerrados = 0;

        foreach ($transacciones as $transaccion) {
            DB::transaction(function () use ($transaccion, $walletService, &$procesados, &$paquetesCerrados) {
                
                // Calculamos el monto de ganancia mensual basado en el rendimiento del paquete
                $montoOriginal = ($transaccion->paquete_valor * $transaccion->rendimiento) / 100;

                // Procesamos el pago aplicando los filtros de capping diario y límite global
                $montoPermitido = $walletService->procesarPagoComision($transaccion, $montoOriginal);

                // Si el monto permitido es null o 0, significa que no se procesó la comisión por haber alcanzado límites
                if (!is_null($montoPermitido) && $montoPermitido > 0) {
                    WalletTransaction::create([
                        'transaction_id' => $transaccion->id,
                        'amount' => $montoPermitido,
                        'porcentaje' => $transaccion->rendimiento
                    ]);
                
                $user = $transaccion->user;
                $user->increment('wallet_balance', $montoPermitido);

                $procesados++;

                } else {
                    $paquetesCerrados++;
                }

                // Actualizamos la fecha de pago de la transacción para el próximo mes
                $transaccion->update([
                    'paid_at' => Carbon::parse($transaccion->paid_at)->addMonth()
                ]);
            });

                
        }

        $this->info("Proceso completado");
        $this->info(" Pagos realizados/ejecutados: $procesados");
        $this->info(" Paquetes que alcanzaron su límite de ganancia: $paquetesCerrados");
        return Command::SUCCESS; 
    }
}
