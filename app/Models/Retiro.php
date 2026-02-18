<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retiro extends Model
{
    use HasFactory;

  
    protected $table = 'retiros';

    protected $fillable = [
        'user_id',
        'amount',
        'wallet_address',
        'status', // 'pending', 'approved','rechazado'
    ];

    /**
     * Relación: Un retiro pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}