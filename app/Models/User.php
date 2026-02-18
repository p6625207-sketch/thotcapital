<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'phone',
        'email',
        'password',
        'referred_by',
        'wallet_address',
        'wallet_balance'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'wallet_balance' => 'decimal:8',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Código de referido
    public function referralCode(): HasOne
    {
        return $this->hasOne(Code::class);
    }

    // Sponsor
    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referred_by');
    }

    // Referidos
    public function referrals(): HasMany
    {
        return $this->hasMany(User::class, 'referred_by');
    }

    //  TODAS LAS TRANSACCIONES DEL USUARIO
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'user_id');
    }

    //  TRANSACCIÓN ACTIVA
    public function activeTransaction(): HasOne
    {
        return $this->hasOne(Transaction::class, 'user_id')
                    ->where('is_active', true);
    }

    // Comisiones ganadas
    public function commissions(): HasMany
    {
        return $this->hasMany(Comision::class);
    }

    // Comisiones generadas por otros
    public function commissionsFrom(): HasMany
    {
        return $this->hasMany(Comision::class, 'from_user_id');
    }
    public function retiros(): HasMany
    {
        return $this->hasMany(Retiro::class);
    }
}
