<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\Code;
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

        $sponsorId = $codeData->user_id;

        return DB::transaction(function () use ($googleData, $sponsorId) {
            $user = User::create([
                'name' => $googleData['name'],
                'last_name' => $googleData['last_name'],
                'email' => $googleData['email'],
                'password' => bcrypt(str()->random(16)),
                'referred_by' => $sponsorId, 
                'wallet' => 0, 
            ]);

            Code::createForUser($user->id); 

            Auth::login($user);
            session()->forget('google_user');

            return redirect()->route('dashboard');
        });
    }
}
