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
        Schema::create('cargas_sociales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sueldo_id');
            $table->decimal('monto', 10, 2);
            $table->string('descripcion');
            $table->timestamps();

            $table->foreign('sueldo_id')->references('id')->on('sueldos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargas_sociales');
    }
};
