<?php

namespace App\Http\Controllers;

use App\Models\PiramideNivel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PiramideController extends Controller
{
    /**
     * Muestra la pirámide de usuarios con sus niveles y porcentajes configurados.
     */
    public function index()
    {
        $nivelesConfig = PiramideNivel::orderBy('nivel')->get();

        // Construye la pirámide nivel a nivel usando la cadena de referidos
        $usersByLevel = [];
        $currentIds   = User::whereNull('parent_id')->pluck('id')->toArray();
        $maxNivel     = $nivelesConfig->count() ?: 8;

        for ($depth = 1; $depth <= $maxNivel; $depth++) {
            if (empty($currentIds)) {
                $usersByLevel[$depth] = ['total' => 0, 'usuarios' => []];
            } else {
                $users = User::whereIn('id', $currentIds)
                    ->select('id', 'name', 'last_name', 'email', 'created_at')
                    ->orderBy('created_at', 'desc')
                    ->limit(50)
                    ->get();

                $usersByLevel[$depth] = [
                    'total'    => count($currentIds),
                    'usuarios' => $users,
                ];

                // Siguiente nivel: usuarios referidos por los del nivel actual
                $currentIds = User::whereIn('parent_id', $currentIds)
                    ->pluck('id')
                    ->toArray();
            }
        }

        $piramide = $nivelesConfig->map(function ($nivel) use ($usersByLevel) {
            $data = $usersByLevel[$nivel->nivel] ?? ['total' => 0, 'usuarios' => []];

            return [
                'nivel'          => $nivel->nivel,
                'porcentaje'     => (float) $nivel->porcentaje,
                'total_usuarios' => $data['total'],
                'usuarios'       => $data['usuarios'],
            ];
        })->values();

        return Inertia::render('Admin/Piramide', [
            'piramide' => $piramide,
        ]);
    }

    /**
     * Actualiza el porcentaje de un nivel de la pirámide.
     */
    public function update(Request $request, $nivel)
    {
        $validated = $request->validate([
            'porcentaje' => 'required|numeric|min:0|max:100',
        ]);

        PiramideNivel::updateOrCreate(
            ['nivel' => (int) $nivel],
            ['porcentaje' => $validated['porcentaje']]
        );

        return redirect()->back()->with('success', "Nivel {$nivel} actualizado correctamente.");
    }
}
