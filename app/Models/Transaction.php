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
        'paid_at_binario',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'paid_at' => 'datetime',
        'is_active' => 'boolean',
        'paid_at_binario' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function walletTransactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class);
    }

    /**
     * calcula el limite maximo de ganancia (300% del valor del paquete)
     */
    //limite_ganancia
    public function getLimiteGananciaAttribute()
    {
        return $this->paquete_valor * 3;
    }

    /**
     * calcula el porcentaje de progreso hacia el límite de ganancia (300%)
     *  considerando tanto las comisiones como las transacciones en la wallet.
     *  Retorna un valor entre 0 y 100 representando el porcentaje de progreso.
     * ejemplo: si el límite es 300 y el usuario ha ganado 150,
     *  el porcentaje sería 50%. Si ha ganado 300 o más, el porcentaje sería 100%.
     */
    public function getPorcentajeProgresoAttribute()
    {
        $limite = $this->limite_ganancia;
        if ($limite <= 0) {
            return 0;
        }
        $ganado =
            $this->commissions()->sum('amount') +
            $this->walletTransactions()->sum('amount');
        return min(100, ($ganado / $limite) * 100);
    }

    /**
     * Determina si el paquete aún tiene capacidad de cobro
     */
    public function tieneCapacidad(): bool
    {
        $gananciaActual = $this->walletTransactions()->sum('amount');
        return $gananciaActual < $this->limite_ganancia;
    }

    /**
     * Calcula el límite de cobro diario (200% del valor del paquete)
     */
    public function getLimiteCobroDiarioAttribute()
    {
        return $this->paquete_valor * 2;
    }
}
