<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Services\WalletService;
use Illuminate\Support\Facades\DB;

class ProcesarBonoBinario extends Command
{
    protected $signature = 'app:procesar-bono-binario';
    protected $description = 'Paga el 10% del equipo menor sin restar puntos de los acumuladores.';

    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        parent::__construct();
        $this->walletService = $walletService;
    }

    public function handle()
    {
        // 1. Buscamos usuarios con paquete activo y puntos en ambos lados
        $usuarios = User::whereHas('activeTransaction')
            ->where('puntos_izquierda', '>', 0)
            ->where('puntos_derecha', '>', 0)
            ->get();

        $pagados = 0;

        foreach ($usuarios as $user) {
            DB::transaction(function () use ($user, &$pagados) {
                // Bloqueo de seguridad para evitar duplicados
                $user = User::lockForUpdate()->find($user->id);
                
                $left = (float)$user->puntos_izquierda;
                $right = (float)$user->puntos_derecha;

                // 2. Cálculo basado ÚNICAMENTE en el equipo menor
                $ladoMenorMonto = min($left, $right);

                $ladoMenor = 



                $gananciaBono = $ladoMenorMonto * 0.10; // Bono del 10%

                // 3. Pasar por el WalletService para Capping (200% y 300%)
                $transaction = $user->activeTransaction;
                $montoFinal = $this->walletService->procesarPagoComision(
                    $transaction, 
                    $gananciaBono, 
                    'comision_binaria'
                );

                if ($montoFinal > 0) {
                    // 4. SOLO SUMAMOS A LA WALLET (No tocamos puntos_izquierda ni puntos_derecha)
                    $user->wallet_balance += $montoFinal;
                    $user->save();

                    // 5. Registro de la comisión para el historial
                    DB::table('comisions')->insert([
                        'user_id' => $user->id,
                        'transaction_id' => $transaction->id,
                        'amount' => $montoFinal,
                        'tipo' => 'binario',
                        'created_at' => now('America/La_Paz'),
                        'updated_at' => now('America/La_Paz'),
                    ]);

                    $pagados++;
                }
            });
        }

        $this->info("Bono binario pagado a $pagados usuarios sin descontar puntos.");
        return Command::SUCCESS;
    }
}