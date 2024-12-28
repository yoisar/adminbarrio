<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCobrosTable extends Migration
{
    public function up()
    {
        Schema::create('cobros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('expensa_id')->constrained()->onDelete('cascade');
            $table->decimal('monto_pagado', 10, 2);
            $table->date('fecha_pago');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cobros');
    }
}