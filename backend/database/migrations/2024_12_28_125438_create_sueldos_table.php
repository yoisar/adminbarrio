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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('monto', 10, 2);
            $table->date('fecha_pago');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sueldos');
    }
}