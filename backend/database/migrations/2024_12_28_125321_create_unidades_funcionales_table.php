<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadesFuncionalesTable extends Migration
{
    public function up()
    {
        Schema::create('unidades_funcionales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barrio_id')->constrained()->onDelete('cascade');
            $table->foreignId('propietario_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('inquilino_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('numero');
            $table->decimal('saldo_actual', 10, 2);
            $table->string('estado');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('unidades_funcionales');
    }
}