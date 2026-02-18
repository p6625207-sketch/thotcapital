<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ReferidosController extends Controller
{
    public function getreferidos($userId)
    {
        $totalReferidos = User::where('referred_by', $userId)->count();

        return response()->json([
            'user_id' => $userId,
            'total_referidos' => $totalReferidos
        ]);
    }

    public function getlist($userId)
    {
        $referidos = User::where('referred_by', $userId)
            ->with('activeTransaction')
            ->select('id', 'name', 'last_name', 'email', 'phone', 'created_at')
            ->get();

        $totalGanado = 0;

        $referidosTransformados = $referidos->map(function ($user) use (&$totalGanado) {

            $ganancia = 0;
            $valorPaquete = 0;

            if ($user->activeTransaction) {
                $valorPaquete = $user->activeTransaction->paquete_valor;
                $ganancia = $valorPaquete * 0.10; // 10%
                $totalGanado += $ganancia;
            }

            return [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'created_at' => $user->created_at,
                'tiene_cuenta_activa' => $user->activeTransaction ? true : false,
                'valor_paquete' => $valorPaquete,
                'ganancia_10_por_ciento' => $ganancia,
            ];
        });

        return response()->json([
            'user_id' => $userId,
            'total_referidos' => $referidos->count(),
            'total_ganado' => $totalGanado,
            'referidos' => $referidosTransformados
        ]);
    }
}
