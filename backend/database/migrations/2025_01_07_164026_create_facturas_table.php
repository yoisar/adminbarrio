<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturasTable extends Migration
{
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('servicio_id')->constrained()->onDelete('cascade');
            $table->decimal('monto', 10, 2);
            $table->date('fecha_emision');
            $table->date('fecha_vencimiento');
            $table->string('estado');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('facturas');
    }
}