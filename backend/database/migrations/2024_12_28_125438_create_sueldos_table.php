<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSueldosTable extends Migration
{
    public function up()
    {
        Schema::create('sueldos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empleado_id')->constrained('users')->onDelete('cascade');
            $table->string('periodo');
            $table->decimal('monto', 10, 2);
            $table->date('fecha_pago');
            $table->decimal('descuentos', 10, 2)->nullable();
            $table->decimal('neto', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sueldos');
    }
}