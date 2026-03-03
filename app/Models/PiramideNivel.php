<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PiramideNivel extends Model
{
    protected $table = 'piramide_niveles';

    protected $fillable = ['nivel', 'porcentaje'];

    protected $casts = [
        'nivel'      => 'integer',
        'porcentaje' => 'decimal:2',
    ];
}
