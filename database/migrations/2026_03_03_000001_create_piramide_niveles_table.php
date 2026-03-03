<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('piramide_niveles', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('nivel')->unique();
            $table->decimal('porcentaje', 5, 2)->default(0);
            $table->timestamps();
        });

        // Seeder de niveles por defecto
        $defaults = [
            ['nivel' => 1, 'porcentaje' => 10.00],
            ['nivel' => 2, 'porcentaje' => 7.00],
            ['nivel' => 3, 'porcentaje' => 5.00],
            ['nivel' => 4, 'porcentaje' => 3.00],
            ['nivel' => 5, 'porcentaje' => 2.00],
            ['nivel' => 6, 'porcentaje' => 1.50],
            ['nivel' => 7, 'porcentaje' => 1.00],
            ['nivel' => 8, 'porcentaje' => 0.50],
        ];

        foreach ($defaults as $row) {
            DB::table('piramide_niveles')->insert([
                'nivel'      => $row['nivel'],
                'porcentaje' => $row['porcentaje'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('piramide_niveles');
    }
};
