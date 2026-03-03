<?php

namespace App\Http\Controllers;

use App\Models\Retiro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use App\Models\WalletTransaction;

class RetiroController extends Controller
{
    public function crearRetiro(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'error' => true,
                'message' => 'Usuario no autenticado'
            ], 401);
        }

        try {

            // Validación máxima es 50
            $request->validate([
                'amount' => 'required|numeric|min:20|max:50',
            ]);
           
            //monto no valido
            if ($request->amount <= 0) {
                return response()->json([
                    'error' => true,
                    'message' => 'Monto no válido'
                ], 400);
            }

            //ingrese un monto mayor a 20 y menor a 50
            if ($request->amount < 20 || $request->amount > 50) {
                return response()->json([
                    'error' => true,
                    'message' => 'Ingrese un monto entre 20 y 50'
                ], 400);
            }

            // Validar wallet
            if (!$user->wallet_address) {
                return response()->json([
                    'error' => true,
                    'message' => 'No tienes una wallet registrada.'
                ], 400);
            }

            // Validar balance
            if ($request->amount > $user->wallet_balance) {
                return response()->json([
                    'error' => true,
                    'message' => 'Saldo insuficiente.'
                ], 400);
            }

            DB::beginTransaction();

            $retiro = Retiro::create([
                'user_id' => $user->id,
                'amount' => $request->amount,
                'wallet_address' => $user->wallet_address,
                'status' => 'pendiente',
            ]);
 
            // Descontar balance
            $user->wallet_balance -= $request->amount;
            $user->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Retiro solicitado correctamente.',
                'data' => $retiro
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'error' => true,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }
}
