<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Retiro;
use App\Models\WalletTransaction;

class HistorialController extends Controller
{
    public function gethistorial($userId)
    {
        $user = User::findOrFail($userId);

        $retiros = $user->retiros()
                        ->orderBy('created_at', 'desc') // últimos primero
                        ->take(4)
                        ->get();

        return response()->json($retiros);
    } 


    public function gethistorialcompleto($userId)
{
    $user = User::with([
        'transactions.walletTransactions'
    ])->findOrFail($userId);

    $historial = collect();

    foreach ($user->transactions as $transaction) {
        foreach ($transaction->walletTransactions as $walletTx) {
            $historial->push([
                'transaction_id' => $transaction->id,
                'paquete_nombre' => $transaction->paquete_nombre,
                'capital_inicial' => $transaction->paquete_valor,
                'porcentaje' => $walletTx->porcentaje,
                'amount' => $walletTx->amount,
                'fecha' => $walletTx->created_at,
            ]);
        }
    }

    $historialOrdenado = $historial->sortByDesc('fecha')->values();

    return response()->json([
        'user_id' => $userId,
        'total_registros' => $historialOrdenado->count(),
        'historial' => $historialOrdenado
    ]);
}

    public function gethistorialRetiro($userId)
{
    $user = User::findOrFail($userId);

    $retiros = $user->retiros()
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($retiro) {
            return [
                'id' => $retiro->id,
                'amount' => $retiro->amount,
                'wallet_address' => $retiro->wallet_address,
                'status' => $retiro->status,
                'fecha' => $retiro->created_at,
            ];
        });

    return response()->json([
        'user_id' => $userId,
        'total_retiros' => $retiros->count(),
        'total_retirado' => $retiros->sum('amount'),
        'retiros' => $retiros
    ]);
}


}
