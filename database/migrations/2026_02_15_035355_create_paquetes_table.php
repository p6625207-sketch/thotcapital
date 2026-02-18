<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('paquetes', function (Blueprint $table) {
        $table->id(); // id autoincremental
        $table->string('nombre'); // nombre del paquete
        $table->decimal('valor', 10, 2); // valor del paquete (decimal con 2 decimales)
        $table->timestamps(); // created_at y updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paquetes');
    }
};
