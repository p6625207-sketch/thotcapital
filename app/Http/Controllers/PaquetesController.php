<?php

namespace App\Http\Controllers;

use App\Models\Comision;
use App\Models\Paquete;
use App\Models\User;
use App\Models\WalletTransaction;

class PaquetesController extends Controller
{
    public function getPaquetes()
    {
        // Traer todos los paquetes
        $paquetes = Paquete::all(); // Eloquent trae todos los registros

        // Devolver como JSON para que React/Inertia los consuma
        return response()->json($paquetes);
    }

    public function getPaqueteActivoUsuario($userId)
    {
        $user = User::with('activeTransaction')->find($userId);

        if (!$user) {
            return response()->json(
                [
                    'error' => true,
                    'message' => 'Usuario no encontrado',
                ],
                404
            );
        }

        $transaction = $user->activeTransaction;

        if (!$transaction) {
            return response()->json(null, 200);
        }

        //sumar lo ganado por red: ejemplo: si el usuario tiene 3 referidos, y cada uno le genera 10 de comisión, entonces gananciaRed sería 30
        $gananciaRed = Comision::where('transaction_id', $transaction->id)->sum(
            'amount'
        );

        //sumar lo ganado por sistema
        $gananciaSistema = WalletTransaction::where(
            'transaction_id',
            $transaction->id
        )->sum('amount');

        $totalGanancia = $gananciaRed + $gananciaSistema;
        $limiteGlobal = $transaction->limite_ganancia;

        $capacidadDisponible = max(0, $limiteGlobal - $totalGanancia);
        $porcentajeProgreso =
            $limiteGlobal > 0
                ? min(100, ($totalGanancia / $limiteGlobal) * 100)
                : 0;

        // Para el capping diario, sumamos lo ganado hoy (comisiones + wallet transactions)
        $gananciaHoy =
            Comision::where('transaction_id', $transaction->id)
                ->whereDate('created_at', now()->toDateString())
                ->sum('amount') +
            WalletTransaction::where('transaction_id', $transaction->id)
                ->whereDate('created_at', now()->toDateString())
                ->sum('amount');

        $limiteDiario = $transaction->limite_cobro_diario;

        $disponibleDiario = max(0, $limiteDiario - $gananciaHoy);

        $porcentajeDiario =
            $limiteDiario > 0
                ? min(100, ($gananciaHoy / $limiteDiario) * 100)
                : 0;

        return response()->json([
            'id' => $transaction->id,
            'nombre' => $transaction->paquete_nombre,
            'valor' => $transaction->paquete_valor,
            'rendimiento' => $transaction->rendimiento,
            'status' => $transaction->status,

            'ganancia_acumulada' => round($totalGanancia, 2),
            'capacidad_disponible' => round($capacidadDisponible, 2),
            'porcentaje_progreso' => round($porcentajeProgreso, 2),
            'limite_maximo' => round($limiteGlobal, 2),

            'ganancia_hoy' => round($gananciaHoy, 2),
            'porcentaje_diario' => round($porcentajeDiario, 2),
            'limite_diario' => round($limiteDiario, 2),
            'disponible_diario' => round($disponibleDiario, 2),

            'paid_at' => $transaction->paid_at
                ? $transaction->paid_at
                    ->timezone('America/La_Paz')
                    ->format('d/m/Y H:i')
                : null,

            'created_at' => $transaction->created_at
                ? $transaction->created_at
                    ->timezone('America/La_Paz')
                    ->format('d/m/Y H:i')
                : null,
        ]);
    }
}
