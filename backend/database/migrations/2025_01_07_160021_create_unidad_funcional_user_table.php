<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadFuncionalUserTable extends Migration
{
    public function up()
    {
        Schema::create('unidad_funcional_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('unidad_funcional_id')->constrained('unidades_funcionales')->onDelete('cascade');
            $table->string('tipo'); // 'propietario' o 'inquilino'
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('unidad_funcional_user');
    }
}