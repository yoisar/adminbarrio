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
            $table->decimal('monto_total', 10, 2);
            $table->date('fecha');
            $table->string('detalle')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expensas');
    }
}