<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGastosTable extends Migration
{
    public function up()
    {
        Schema::create('gastos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barrio_id')->constrained()->onDelete('cascade');
            $table->foreignId('expensa_id')->constrained()->onDelete('cascade');
            $table->foreignId('categoria_gasto_id')->constrained()->onDelete('cascade');
            $table->string('descripcion');
            $table->decimal('monto', 10, 2);
            $table->date('fecha');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('gastos');
    }
}