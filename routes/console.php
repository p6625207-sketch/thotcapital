<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// 1. Primero: comisiones de pirámide (lee paid_at antes de que el siguiente lo avance)
Schedule::command('app:procesar-comisiones-piramide')->everyFiveMinutes();

// 2. Segundo: rendimientos mensuales + avance de paid_at
Schedule::command('app:procesar-pagos-mensuales')->everyFiveMinutes();