<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensasTable extends Migration
{
    public function up()
    {
        Schema::create('expensas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_vencimiento');
            $table->decimal('total', 10, 2); // Total de la expensa
            $table->decimal('saldo_anterior', 10, 2)->default(0);
            $table->decimal('monto_pagado', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expensas');
    }
}