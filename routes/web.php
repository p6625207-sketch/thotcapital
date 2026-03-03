<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminControllerDashboard;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaquetesController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReferidosController;
use App\Http\Controllers\RetiroController;
use App\Http\Controllers\CodigoController;
use App\Http\Controllers\PiramideController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialLoginController;
 
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
 

Route::get('/Acerca', function () {
    return Inertia::render('Acerca', [
    ]);
});


Route::get('/Preguntas', function () {
    return Inertia::render('Preguntas', [
    ]);
});


Route::get('/Politicas', function () {
    return Inertia::render('Politicas', [
    ]);
});


Route::get('/Contacto', function () {
    return Inertia::render('Contacto', [
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/packages', function () {
        return Inertia::render('Packages');
    })->name('packages');

    Route::get('/withdrawals', function () {
        return Inertia::render('Withdrawals');
    })->name('withdrawals');

    Route::get('/referrals', function () {
        return Inertia::render('Referrals');
    })->name('referrals');

    Route::get('/history', function () {
        return Inertia::render('History');
    })->name('history');

    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');

    Route::get('/paquetes/{userId}', [PaquetesController::class, 'getPaqueteActivoUsuario']);

    Route::get('/codigoreferido/{userId}', [CodigoController::class, 'obtenerCodigo']);

    Route::get('/referidos/{userId}', [ReferidosController::class, 'getreferidos']);

    Route::get('/referidos/{userId}/lista', [ReferidosController::class, 'getlist']);

    Route::get('/historial/{userId}', [HistorialController::class, 'gethistorial']);

    Route::get('/historial/{userId}/completo', [HistorialController::class, 'gethistorialcompleto']);

    Route::get('/historial/{userId}/retiro', [HistorialController::class, 'gethistorialRetiro']);

    Route::post('/retiros', [RetiroController::class, 'crearRetiro']);

    Route::post('/payment/verify', [PaymentController::class, 'verifyPayment']);

});
   



    Route::get('/paquetes', [PaquetesController::class, 'getPaquetes']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/wallet', [ProfileController::class, 'updateWallet'])->name('profile.wallet.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    Route::middleware('auth:admin')->group(function () {

        Route::get('/dashboard', [AdminControllerDashboard::class, 'index']);

        Route::get('/retiros', [AdminControllerDashboard::class, 'getRetirosPendientes'])->name('admin.retiros');

        Route::get('/retiros/search', [AdminControllerDashboard::class, 'searchRetiros'])->name('admin.retiros.search');
        Route::patch('/retiros/{id}/update-status', [AdminControllerDashboard::class, 'updateStatus'])->name('admin.retiros.updateStatus');
        Route::get('/transactions', [AdminControllerDashboard::class, 'getAllTransactions'])->name('admin.transactions');

        Route::get('/users', [AdminControllerDashboard::class, 'getActiveUsers'])->name('admin.users');
        Route::get('/paquetes', [AdminControllerDashboard::class, 'getPaquetes'])->name('admin.paquetes');

        // Cambiamos PUT por MATCH para que acepte el POST enviado por Axios con el spoofing de _method
        Route::match(['put', 'post'], '/paquetes/{id}', [AdminControllerDashboard::class, 'updatePaquete'])
            ->name('admin.paquetes.update');

        // Lo mismo para el delete si usas el service con POST
        Route::match(['delete', 'post'], '/paquetes/delete/{id}', [AdminControllerDashboard::class, 'destroyPaquete'])
            ->name('admin.paquetes.destroy');

        Route::post('/paquetes', [AdminControllerDashboard::class, 'storePaquete'])->name('admin.paquetes.store');

        // Para la pirámide
        Route::get('/piramide', [PiramideController::class, 'index']);
        Route::patch('/piramide/{nivel}', [PiramideController::class, 'update'])->name('admin.piramide.update');
    });
});

// routes/web.php
Route::get('/Acerca', function () {
    return Inertia::render('HeaderSections/Acerca'); 
});

Route::get('/Preguntas', function () {
    return Inertia::render('HeaderSections/Preguntas'); 
});

Route::get('/Politicas', function () {
    return Inertia::render('HeaderSections/Politicas'); 
});

Route::get('/Contacto', function () {
    return Inertia::render('HeaderSections/Contacto');
});


// rutas de login social
Route::get('/auth/google/redirect', [SocialLoginController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/auth/google/callback', [SocialLoginController::class, 'handleGoogleCallback'])->name('google.callback');

// Rutas para el proceso de referido post-Google login
Route::get('/referral-join', function () {
  
    if (!session()->has('google_user')) {
        return redirect()->route('login');
    }
    return Inertia::render('Auth/ReferralForm', [
        'email' => session('google_user')['email']
    ]);
})->name('referral.form');

Route::post('/referral-join', [SocialLoginController::class, 'storeReferral'])->name('referral.store');

require __DIR__ . '/auth.php';
