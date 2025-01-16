<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubcategoriaGastosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subcategoria_gastos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categoria_gasto_id');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->timestamps();

            $table->foreign('categoria_gasto_id')->references('id')->on('categoria_gastos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subcategoria_gastos');
    }
}