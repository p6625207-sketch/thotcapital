<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
 
class CodigoController extends Controller
{
    public function obtenerCodigo($userId)
    {
        // 1. Buscar al usuario por ID
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'error' => 'Usuario no encontrado'
            ], 404);
        }

        // 2. Obtener su código de referido usando la relación
        $codigo = $user->referralCode ? $user->referralCode->code : null;

        if (!$codigo) {
            return response()->json([
                'error' => 'Este usuario no tiene código de referido'
            ], 404);
        }

        // 3. Devolver el código
        return response()->json([
            'user_id' => $user->id,
            'codigo_referido' => $codigo
        ]);
    }
}
