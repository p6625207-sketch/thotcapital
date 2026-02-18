<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'paquete_nombre',
        'paquete_valor',
        'rendimiento',
        'status',
        'is_active',
        'tx_id',
        'paid_at',
    ];

protected $casts = [
    'started_at' => 'datetime',
    'paid_at' => 'datetime',
    'is_active' => 'boolean',
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function walletTransactions(): HasMany
    {
    return $this->hasMany(WalletTransaction::class);
    }

}
