<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Code extends Model
{
    protected $fillable = ['user_id', 'code'];

    // Relación inversa: Un código pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Método estático para generar el registro automáticamente
    public static function createForUser($userId)
    {
        return self::create([
            'user_id' => $userId,
            'code' => 'REF-' . strtoupper(Str::random(8)), // Código de 8 caracteres
        ]);
    }
}