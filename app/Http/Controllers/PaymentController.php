<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use App\Models\Transaction;
use App\Models\User;
//use Illuminate\Container\Attributes\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use App\Services\WalletService;
use App\Models\Comision;
use App\Models\WalletTransaction;   
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function verifyPayment(Request $request)
    {
        $request->validate([
            'paquete_id' => 'required|exists:paquetes,id',
        ]);

        $user = Auth::user();
        $paquete = Paquete::findOrFail($request->paquete_id);

        // Consultar depósitos en Binance
        $deposits = $this->getBinanceDeposits();

        if ($deposits === null) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error al consultar depósitos en Binance.',
                ],
                500
            );
        }

        // Buscar depósito que coincida con el valor del paquete
        $matchingDeposit = $this->findMatchingDeposit(
            $deposits,
            $paquete->valor
        );

        if (!$matchingDeposit) {
            return response()->json([
                'status' => 'pending',
                'message' =>
                    'Aún no se detecta el depósito. Seguimos verificando...',
            ]);
        }

        DB::beginTransaction();

        try {
            // Desactivar transacciones previas
            Transaction::where('user_id', $user->id)
                ->where('is_active', true)
                ->update(['is_active' => false]);

            // Sumar saldo al usuario comprador
            $user->wallet_balance =
                ($user->wallet_balance ?? 0) + floatval($paquete->valor);
            $user->save();

            // Crear transacción
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'paquete_nombre' => $paquete->nombre,
                'paquete_valor' => $paquete->valor,
                'rendimiento' => $paquete->rendimiento,
                'status' => 'completed',
                'is_active' => true,
                'tx_id' => $matchingDeposit['txId'],
                'paid_at' => now()->addMonth(),
            ]);

            // COMISIÓN POR REFERIDO (10%)
            if ($user->referred_by) {
                $sponsor = User::find($user->referred_by);

                // Verificar que el sponsor tenga una transacción activa antes de otorgar la comisión
                $sponsorActiveTx = Transaction::where('user_id', $sponsor->id)
                    ->where('is_active', true)
                    ->first();

                if ($sponsor && $sponsorActiveTx) {
                    $commissionAmount = floatval($paquete->valor) * 0.1;

                    $montoFinalPermitido = (new WalletService())->procesarPagoComision(
                        $sponsorActiveTx,
                        $commissionAmount
                    );

                    if (!is_null($montoFinalPermitido) && $montoFinalPermitido > 0) {
                        $sponsor->increment(
                            'wallet_balance',
                            $montoFinalPermitido
                        );

                        \App\Models\Comision::create([
                            'user_id' => $sponsor->id,
                            'from_user_id' => $user->id,
                            'transaction_id' => $transaction->id,
                            'amount' => $montoFinalPermitido,
                        ]);
                    }else{
                        Log::info(
                            "Comisión de referido para usuario {$sponsor->id} ajustada a 0 debido a límites diarios o globales. Comisión original: {$commissionAmount}."
                        );
                    }
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Error procesando la transacción',
                ],
                500
            );
        }

        return response()->json([
            'status' => 'confirmed',
            'message' => 'Pago confirmado. Tu paquete está activo.',
            'transaction' => [
                'id' => $transaction->id,
                'paquete_nombre' => $transaction->paquete_nombre,
                'paquete_valor' => $transaction->paquete_valor,
                'rendimiento' => $transaction->rendimiento,
                'status' => $transaction->status,
                'paid_at' => $transaction->paid_at
                    ->timezone('America/La_Paz')
                    ->format('d/m/Y H:i'),
            ],
            'deposit' => [
                'coin' => $matchingDeposit['coin'],
                'amount' => $matchingDeposit['amount'],
                'txId' => $matchingDeposit['txId'],
            ],
        ]);
    }

    private function getBinanceDeposits(): ?array
    {
        $apiKey = env('BINANCE_API_KEY');
        $apiSecret = env('BINANCE_API_SECRET');
        $baseUrl = 'https://api.binance.com';
        $endpoint = '/sapi/v1/capital/deposit/hisrec';

        $serverTimeResponse = Http::get("$baseUrl/api/v3/time");

        if (!$serverTimeResponse->ok()) {
            return null;
        }

        $timestamp = $serverTimeResponse->json()['serverTime'];
        $now = now();
        $startTime = $now->copy()->subDays(7)->timestamp * 1000;
        $endTime = $now->timestamp * 1000;

        $queryString = "timestamp={$timestamp}&startTime={$startTime}&endTime={$endTime}&limit=100";
        $signature = hash_hmac('sha256', $queryString, $apiSecret);
        $fullUrl = "$baseUrl$endpoint?$queryString&signature=$signature";

        try {
            $response = Http::withHeaders(['X-MBX-APIKEY' => $apiKey])->get(
                $fullUrl
            );

            if (!$response->ok()) {
                return null;
            }

            $data = $response->json();
            return $data ?: [];
        } catch (\Exception $e) {
            return null;
        }
    }
}
