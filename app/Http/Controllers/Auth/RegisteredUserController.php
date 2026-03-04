<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\PiramideNivel;
use App\Models\Code;
use Illuminate\Support\Facades\DB; // Asegúrate de tener este import arribause Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            //que hacia lowercase en gmail? lo quite porque me daba problemas con los emails que tienen mayusculas, y el unique no los reconocia como iguales
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'referred_by' => 'required|string|max:255',
        ]);

        if ($request->referred_by) {
            $codeData = Code::where('code', $request->referred_by)->first();

            if (!$codeData) {
                return back()
                    ->withErrors([
                        'referred_by' => 'El código de referido es incorrecto.',
                    ])
                    ->withInput();
            }
        }

        try {
            if (!$codeData) {
                return back()
                    ->withErrors([
                        'referred_by' => 'El código de referido es incorrecto.',
                    ])
                    ->withInput();
            }

            $response = DB::transaction(function () use ($request, $codeData) {
                $sponsorUser = User::lockForUpdate()->find($codeData->user_id);

                if (!$sponsorUser) {
                    throw new \Exception('Sponsor no encontrado.');
                }

                // Buscar posición disponible por amplitud
                $position = $this->findAvailablePosition($sponsorUser->id);

                if (!$position) {
                    throw new \Exception(
                        'No hay posición disponible en el árbol.'
                    );
                }

                // Buscar el usuario padre para la nueva posición y bloquearlo para evitar condiciones de carrera
                $parent = User::lockForUpdate()->find($position['parent']->id);

                // Verificar que el usuario padre exista antes de continuar
                if (!$parent) {
                    throw new \Exception('Usuario padre no encontrado.');
                }

                // Verificar que el espacio en el lado correspondiente esté libre antes de crear el nuevo usuario
                if ($position['side'] === 'left' && $parent->left_son_id) {
                    throw new \Exception('Espacio izquierdo ya ocupado.');
                }

                // Verificar que el espacio en el lado correspondiente esté libre antes de crear el nuevo usuario
                if ($position['side'] === 'right' && $parent->right_son_id) {
                    throw new \Exception('Espacio derecho ya ocupado.');
                }

                //nivel del nuevo usuario es el nivel del padre + 1
                $nivelNuevoUsuario = $parent->nivel + 1;

                //verificar que el nivel exista en la tabla de piramide_niveles
                $nivelExiste = PiramideNivel::where(
                    'nivel',
                    $nivelNuevoUsuario
                )->exists();

                /** 
                 * en caso de que la empresa quiera poner un nivel tope para la pirámide, 
                 * aquí se podría lanzar una excepción si el nivel del nuevo usuario supera 
                 * ese tope, por ejemplo:
                 * 
               * if(!$nivelExiste){
               *      throw new \Exception('Se alcanzó el nivel máximo permitido.');

               * }
                     */

                if (!$nivelExiste) {
                    PiramideNivel::create([
                        'nivel' => $nivelNuevoUsuario,
                        'porcentaje' => 0, // o el porcentaje que quieras asignar por defecto
                    ]);
                }

                // Crear usuario
                $user = User::create([
                    'name' => $request->name,
                    'last_name' => $request->last_name,
                    'phone' => $request->phone,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'referred_by' => $sponsorUser->id, // el sponsor es el usuario que generó el código de referido
                    'wallet' => 0,
                    // Asignar el padre y el lado correspondiente para construir el árbol binario
                    'parent_id' => $parent->id,
                    'binary_side' => $position['side'],
                    'nivel' => $nivelNuevoUsuario,
                ]);

                // Actualizar el usuario padre para asignar el nuevo hijo en el lado correspondiente
                if ($position['side'] === 'left') {
                    $parent->left_son_id = $user->id;
                } else {
                    $parent->right_son_id = $user->id;
                }

                $parent->save();

                Code::createForUser($user->id);

                event(new Registered($user));

                Auth::login($user);

                return redirect(route('dashboard', absolute: false));
            });

            return $response;
        } catch (\Exception $e) {
            return back()
                ->withErrors([
                    'error' => 'No se pudo completar el registro.',
                ])
                ->withInput();
        }
    }

    // Función auxiliar para encontrar la primera posición disponible en el árbol binario
    private function findAvailablePosition($rootId)
    {
        $queue = [$rootId];

        while (!empty($queue)) {
            $currentId = array_shift($queue);

            $current = User::find($currentId);

            if (!$current) {
                continue; // Si el usuario no existe, seguimos con el siguiente en la cola
            }

            // sirve para verificar si el usuario actual tiene espacio libre en el lado izquierdo o derecho, y si es así, devuelve la información del padre y el lado disponible. Si ambos lados están ocupados, agrega los hijos a la cola para seguir buscando.
            if (!$current->left_son_id) {
                return [
                    'parent' => $current,
                    'side' => 'left',
                ];
            }

            // Si el lado izquierdo está ocupado, verificamos el derecho
            if (!$current->right_son_id) {
                return [
                    'parent' => $current,
                    'side' => 'right',
                ];
            }

            // si ambos lados están ocupados, agregamos los hijos a la cola para seguir buscando
            if ($current->left_son_id) {
                $queue[] = $current->left_son_id;
            }

            //si el lado derecho también está ocupado, agregamos el hijo derecho a la cola para seguir buscando
            if ($current->right_son_id) {
                $queue[] = $current->right_son_id;
            }
        }

        return null;
    }
}
