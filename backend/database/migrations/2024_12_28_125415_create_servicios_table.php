<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiciosTable extends Migration
{
    public function up()
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barrio_id')->constrained()->onDelete('cascade');
            $table->string('tipo');
            $table->string('proveedor');
            $table->string('estado');
            $table->decimal('monto', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('servicios');
    }
}