<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Retiro;
use Illuminate\Support\Facades\DB;

class AdminControllerDashboard extends Controller
{
    /**
     * Página principal del panel admin con categorías y subcategorías
     */
    // AdminControllerDashboard.php
    public function index()
    {
        return Inertia::render('Admin/AdminDashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_invested' => Transaction::sum('paquete_valor'),
            ]
        ]);
    }

    /**
     * Página para gestionar retiros pendientes
     */
    public function getRetirosPendientes(Request $request)
    {
        $query = Retiro::with('user:id,name,last_name,email')
            ->where('status', 'pendiente');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $retiros = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString(); // Importante: mantiene el parámetro 'search' al cambiar de página

        return Inertia::render('Admin/Retiros', [
            'retiros' => $retiros,
            'filters' => $request->only(['search']) // Devolvemos el filtro para mantener el input lleno
        ]);
    }

    /**
     * Actualiza el estado de un retiro (Aprobar/Rechazar).
     */
    public function updateStatus(Request $request, $id)
    { {
            $request->validate([
                'status' => 'required|in:pendiente,aprobado,rechazado',
            ]);

            DB::transaction(function () use ($request, $id) {
                $retiro = Retiro::findOrFail($id);
                $oldStatus = $retiro->status;
                $newStatus = $request->status;

                if ($newStatus === 'rechazado' && $oldStatus !== 'rechazado') {
                    $user = User::findOrFail($retiro->user_id);

                    $user->increment('wallet_balance', $retiro->amount);
                }

                $retiro->update([
                    'status' => $newStatus
                ]);
            });

            return redirect()->back()->with('message', 'Estado actualizado y fondos gestionados correctamente.');
        }
    }


    /**
     * Buscar retiros por nombre de usuario, email o estado.
     */
    public function searchRetiros(Request $request)
    {
        $query = Retiro::with('user:id,name,last_name,email');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'todos') {
            $query->where('status', $request->status);
        }

        $retiros = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Retiros', [
            'retiros' => $retiros,
            'filters' => $request->only(['search', 'status']) // Devolvemos los filtros para que el input no se vacíe
        ]);
    }

    /**
     * funcion que me traiga todas las tranaciones de todos los usuarios, con su nombre, apellido y email, ordenados por fecha de creación, con paginación de 15 por página
     */

    public function getAllTransactions(Request $request)
    {
        $query = Transaction::with(['user' => function ($q) {
            $q->select('id', 'name', 'last_name', 'email', 'wallet_balance')
                ->withCount('referrals');
        }]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            })->orWhere('paquete_nombre', 'LIKE', "%{$search}%");
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Transaction', [
            'transactions' => $transactions,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     *obtner todos los usuarios activos, con su nombre, apellido, email, balance de wallet y número de referidos, ordenados por fecha de creación, con paginación de 15 por página
     */
    public function getActiveUsers(Request $request)
    {
        $query = User::select('id', 'name', 'last_name', 'phone', 'email', 'wallet_balance', 'created_at')
            ->withCount('referrals');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/UsuariosActivos', [
            'users' => $users,
            'filters' => $request->only(['search'])
        ]);
    }


    /**
     * Obtener todos los paquetes configurados en el sistema
     */
    public function getPaquetes(Request $request)
    {
        $query = Paquete::select('id', 'nombre', 'valor', 'rendimiento', 'comision', 'created_at');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('nombre', 'LIKE', "%{$search}%");
        }

        $paquetes = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Paquetes', [
            'paquetes' => $paquetes,
            'filters' => $request->only(['search'])
        ]);
    }


    /**
     * Actualizar un paquete de inversión específico
     */
    public function updatePaquete(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre'      => 'required|string|max:255',
            'valor'       => 'required|numeric|min:0',
            'rendimiento' => 'required|numeric|min:0',
            'comision'    => 'required|numeric|min:0|max:100',
        ]);

        $paquete = Paquete::findOrFail($id);
        $paquete->update($validated);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Actualizado con éxito']);
        }

        return redirect()->back()->with('success', 'Paquete actualizado correctamente.');
    }

    /**
     * Eliminar un paquete de inversión específico
     */
    public function destroyPaquete($id)
    {
        $paquete = Paquete::findOrFail($id);

        $paquete->delete();

        return redirect()->back()->with('success', 'El paquete ha sido eliminado permanentemente.');
    }


    /**
     * Crear un nuevo paquete de inversión
     */
    public function storePaquete(Request $request)
    {
        // 1. Validamos los datos de entrada
        $validated = $request->validate([
            'nombre'      => 'required|string|max:255|unique:paquetes,nombre',
            'valor'       => 'required|numeric|min:0',
            'rendimiento' => 'required|numeric|min:0',
            'comision'    => 'required|numeric|min:0|max:100',
        ]);

        // 2. Creamos el registro en la base de datos
        Paquete::create($validated);

        // 3. Redireccionamos con mensaje de éxito
        return redirect()->back()->with('success', '¡Paquete creado exitosamente!');
    }
}
