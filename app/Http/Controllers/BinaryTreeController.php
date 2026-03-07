<?php

namespace App\Http\Controllers;

use App\Models\PiramideNivel;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BinaryTreeController extends Controller
{
    public function index()
    {
        $rootUser = Auth::user();

        $users = User::select(
            'id',
            'name',
            'last_name',
            'email',
            'parent_id',
            'binary_side'
        )->get();

        // Agrupa los usuarios por su parent_id para facilitar la construcción del árbol
        $grouped = $users->groupBy('parent_id');

        // Construye el árbol binario a partir del usuario raíz
        $tree = $this->buildTree($rootUser->id, $grouped);


        return Inertia::render('User/Network', [
            'tree' => $tree,
        ]);
    }

    private function buildTree($userId)
    {
        $user = User::select('id', 'name', 'last_name', 'email')->find($userId);

        if (!$user) {
            return null;
        }

        $hasActiveTransaction = Transaction::where('user_id', $user->id)
            ->where('is_active', true)
            ->exists();

        $children = User::where('parent_id', $userId)->get();

        $left = $children->where('binary_side', 'left')->first();

        $right = $children->where('binary_side', 'right')->first();

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'has_active_transaction' => $hasActiveTransaction,
            ],
            'left' => $left ? $this->buildTree($left->id) : null,
            'right' => $right ? $this->buildTree($right->id) : null,
        ];
    }
}
