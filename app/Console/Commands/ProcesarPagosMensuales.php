<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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

    public function handle()
    {

        $transacciones = Transaction::where('is_active', true)
            ->where('paid_at', '<=', Carbon::now())
            ->with('user')
            ->get();

        $procesados = 0;

        foreach ($transacciones as $transaccion) {
            DB::transaction(function () use ($transaccion, &$procesados) {
                
                $montoGanancia = ($transaccion->paquete_valor * $transaccion->rendimiento) / 100;

                WalletTransaction::create([
                    'transaction_id' => $transaccion->id,
                    'amount' => $montoGanancia,
                    'porcentaje' => $transaccion->rendimiento
                ]);

                $user = $transaccion->user;
                $user->increment('wallet_balance', $montoGanancia);

                $transaccion->update([
                    'paid_at' => Carbon::parse($transaccion->paid_at)->addMonth()
                ]);

                $procesados++;
            });
        }
        $this->info("Se procesaron {$procesados} rendimientos correctamente.");

        return Command::SUCCESS; 
    }
}
