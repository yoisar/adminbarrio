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
        Schema::create('conceptos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sueldo_id');
            $table->unsignedBigInteger('carga_social_id')->nullable();
            $table->string('nombre');
            $table->decimal('monto', 10, 2);
            $table->timestamps();

            $table->foreign('sueldo_id')->references('id')->on('sueldos')->onDelete('cascade');
            $table->foreign('carga_social_id')->references('id')->on('cargas_sociales')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conceptos');
    }
};
