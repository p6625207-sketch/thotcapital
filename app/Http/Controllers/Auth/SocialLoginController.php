<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\Code;
use App\Models\PiramideNivel;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SocialLoginController extends Controller
{
    // Redirige a Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user(); // evita InvalidStateException

        $fullName = $googleUser->getName();
        $nameParts = explode(' ', $fullName, 2);
        $firstName = $nameParts[0];
        $lastName = $nameParts[1] ?? ' ';

        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user && $user->referred_by !== null) {
            Auth::login($user);
            return redirect()->route('dashboard');
        }

        session([
            'google_user' => [
                'name' => $firstName,
                'last_name' => $lastName,
                'email' => $googleUser->getEmail(),
            ],
        ]);

        return redirect()->route('referral.form');
    }

    public function storeReferral(Request $request)
    {
        $googleData = session('google_user');

        if (!$googleData) {
            return redirect()->route('login');
        }

        if (!$request->filled('code')) {
            return back()->withErrors([
                'code' => 'Debes ingresar un código de referido',
            ]);
        }

        $codeData = Code::where('code', $request->code)->first();

        if (!$codeData) {
            return back()->withErrors([
                'code' => 'El código de referido no es válido',
            ]);
        }

        return DB::transaction(function () use ($googleData, $codeData) {

            // sirve para bloquear el registro del usuario sponsor para evitar condiciones de carrera al asignar nuevos referidos en el árbol binario
            $sponsorUser = User::lockForUpdate()->find($codeData->user_id);

            if (!$sponsorUser) {
                throw new \Exception('Usuario sponsor no encontrado');
            }

            // Buscar posición disponible por amplitud en el árbol binario a partir del sponsor
            $position = $this->findAvailablePosition($sponsorUser->id);

            if (!$position) {
                throw new \Exception(
                    'No hay posiciones disponibles en el árbol binario'
                );
            }

            // Buscar el usuario padre para la nueva posición y bloquearlo para evitar condiciones de carrera
            $parent = User::lockForUpdate()->find($position['parent']->id);

            if (!$parent) {
                throw new \Exception('Usuario padre no encontrado');
            }

            // Verificar que el espacio en el lado correspondiente del padre esté disponible antes de crear el nuevo usuario
            if ($position['side'] === 'left' && $parent->left_son_id) {
                throw new \Exception('Espacio izquierdo ocupado.');
            }

            // Verificar que el espacio en el lado correspondiente del padre esté disponible antes de crear el nuevo usuario
            if ($position['side'] === 'right' && $parent->right_son_id) {
                throw new \Exception('Espacio derecho ocupado.');
            }

            //calcular el nivel del nuevo usuario como el nivel del padre + 1
            $nivelNuevoUsuario = $parent->nivel_id + 1;

            $nivelExiste = PiramideNivel::where('nivel', $nivelNuevoUsuario)->exists();

            /**
             * if(!$nivelExiste){ {
              *  throw new \Exception('Se alcanzó el nivel máximo permitido en la pirámide.');
            *}
             */

            if (!$nivelExiste){
                PiramideNivel::create([
                    'nivel' => $nivelNuevoUsuario,
                    'porcentaje' => 0, // o el porcentaje que corresponda para ese nivel
                ]);

            }

            $user = User::create([
                'name' => $googleData['name'],
                'last_name' => $googleData['last_name'],
                'email' => $googleData['email'],
                'password' => bcrypt(str()->random(16)),
                'referred_by' => $sponsorUser->id,
                'wallet' => 0,
                'parent_id' => $parent->id,
                'binary_side' => $position['side'],
                'nivel_id' => $nivelNuevoUsuario,
            ]);

            // Actualizar el usuario padre para asignar el nuevo hijo en el lado correspondiente del árbol binario
            if ($position['side'] === 'left') {
                $parent->left_son_id = $user->id;
            } else {
                $parent->right_son_id = $user->id;
            }

            $parent->save();

            Code::createForUser($user->id);

            Auth::login($user);
            session()->forget('google_user');

            return redirect()->route('dashboard');
        });
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
