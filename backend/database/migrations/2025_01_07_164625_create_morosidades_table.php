<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMorosidadesTable extends Migration
{
    public function up()
    {
        Schema::create('morosidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unidad_funcional_id')->constrained('unidades_funcionales')->onDelete('cascade');
            $table->decimal('monto_total_adeudado', 10, 2);
            $table->date('fecha_ultima_notificacion');
            $table->string('estado');
            $table->timestamps();
        });

        Schema::create('morosidad_expensa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('morosidad_id')->constrained('morosidades')->onDelete('cascade');
            $table->foreignId('expensa_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('morosidad_expensa');
        Schema::dropIfExists('morosidades');
    }
}