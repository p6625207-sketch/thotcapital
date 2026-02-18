<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

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
        $lastName = $nameParts[1] ?? ' '; // Si no hay apellido, enviamos un espacio o valor por defecto

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $firstName,
                'last_name' => $lastName, // <--- Ahora pasamos el dato requerido
                'password' => bcrypt(str()->random(16)),
            ]
        );

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
