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
            $table->foreignId('barrio_id')->constrained()->onDelete('cascade');
            $table->foreignId('unidad_funcional_id')->constrained('unidades_funcionales')->onDelete('cascade');
            $table->string('periodo');
            $table->decimal('total', 10, 2);
            $table->decimal('saldo_pendiente', 10, 2);
            $table->date('fecha_vencimiento');
            $table->string('estado');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expensas');
    }
}