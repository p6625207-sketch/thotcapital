<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use App\Models\User;

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
        return response()->json([
            'error' => true,
            'message' => 'Usuario no encontrado'
        ], 404);
    } 

    $transaction = $user->activeTransaction;

    if (!$transaction) {
        return response()->json(null, 200);
    }

   return response()->json([
    'id' => $transaction->id,
    'nombre' => $transaction->paquete_nombre,
    'valor' => $transaction->paquete_valor,
    'rendimiento' => $transaction->rendimiento,
    'status' => $transaction->status,

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
