<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\WalletTransaction;
use App\Models\Comision;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class WalletService
{
    /**
     *procesa el pago de una comisión aplicando ambos filtros: Capping Diario (200%) y Límite Global (300%). Retorna el monto final permitido después de aplicar ambos filtros.
     */
    public function procesarPagoComision(
        Transaction $transaction,
        float $montoOriginal
    ) {
        return DB::transaction(function () use ($transaction, $montoOriginal) {
            // 1. APLICAR FILTRO: 200% Diario (Capping)
            $montoTrasCappingDiario = $this->calcularMontoPermitidoDiario(
                $transaction,
                $montoOriginal
            );

            // Si el monto permitido después del capping diario es 0 o negativo, no se procesa la comisión
            if ($montoTrasCappingDiario <= 0) {
                Log::info(
                    "CAPPING DIARIO: Usuario {$transaction->user_id} alcanzó su límite diario (200%)."
                );
                return null;
            }

            // Usamos la suma de la tabla comisions para saber cuánto lleva ganado REALMENTE
            $gananciaTotalComision = Comision::where(
                'transaction_id',
                $transaction->id
            )->sum('amount');

            // Y sumamos también lo que ha ganado el usuario a través de la tabla wallet_transactions
            $gananciaTotalSistema = WalletTransaction::where(
                'transaction_id',
                $transaction->id
            )->sum('amount');

            $gananciaTotalHistorica = $gananciaTotalComision + $gananciaTotalSistema;

            // limite_ganancia sale de la relacion getLimiteGananciaAttribute() en Transaction.php
            $limiteGlobal = $transaction->limite_ganancia;

            // Si ya alcanzó o superó el límite global, no se permite más ganancias y se desactiva el paquete
            if ($gananciaTotalHistorica >= $limiteGlobal) {
                $this->desactivarPaquete($transaction);
                return null;
            }

            // Ajustar si este pago lo hace saltar el límite del 300%
            $montoFinal = $montoTrasCappingDiario;

            
            if ($gananciaTotalHistorica + $montoFinal > $limiteGlobal) {
                $montoFinal = max(0, $limiteGlobal - $gananciaTotalHistorica);
                Log::info(
                    "CIERRE DE CICLO: Usuario {$transaction->user_id} ajustado al límite 300%."
                );
            }

            if ($montoFinal <= 0) {
                $this->desactivarPaquete($transaction);
                return null;
            }


            if (($montoFinal + $gananciaTotalHistorica) >= $limiteGlobal) {
                $this->desactivarPaquete($transaction);

            }

            return $montoFinal;
        });
    }

    /**
     * Lógica central del 200% Diario
     */
    private function calcularMontoPermitidoDiario(
        Transaction $transaction,
        float $monto
    ) {
        // Esto viene de la relación getLimiteCobroDiarioAttribute() en Transaction.php
        $limiteDiario = $transaction->limite_cobro_diario;

        // Calculamos cuánto ha ganado el usuario hoy sumando tanto las comisiones como las transacciones en la wallet
        $totalGananciaHoy = Comision::where('transaction_id', $transaction->id)
            ->whereDate('created_at', now()->toDateString())
            ->sum('amount') 
            + 
            WalletTransaction::where('transaction_id', $transaction->id)
            ->whereDate('created_at', now()->toDateString())
            ->sum('amount');

        // Si ya alcanzó o superó el límite diario, no se permite más ganancias hoy
        if ($totalGananciaHoy >= $limiteDiario) {
            return 0;
        }

        // Si el monto que queremos agregar hace que se supere el límite diario, ajustamos el monto permitido
        // ejemplo: si el límite es 100, ya se ganó 80, y el nuevo monto es 30, solo permitimos 20
        if (($totalGananciaHoy + $monto) > $limiteDiario) {
            return $limiteDiario - $totalGananciaHoy;
        }
        return $monto;
        

    }

    /**
     * Desactiva el paquete al llegar al límite
     */
    private function desactivarPaquete(Transaction $transaction)
    {
        $transaction->update([
            'is_active' => false,
            'status' => 'completed',
        ]);
        Log::info(
            "CONTRATO FINALIZADO: Transacción #{$transaction->id} del usuario {$transaction->user_id} desactivada."
        );
    }
}
