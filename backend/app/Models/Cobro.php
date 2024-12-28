<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cobro extends Model
{
    use HasFactory;

    // Nombre de la tabla (opcional si sigue la convención de Laravel)
    protected $table = 'cobros';

    // Atributos que se pueden asignar en masa
    protected $fillable = [
        'user_id',
        'expensa_id',
        'monto_pagado',
        'fecha_pago',
    ];

    // Relación con Usuarios (un cobro pertenece a un usuario)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con Expensas (un cobro pertenece a una expensa)
    public function expensa()
    {
        return $this->belongsTo(Expensa::class);
    }

    // Función para obtener usuarios morosos
    public static function morosos()
    {
        return User::whereDoesntHave('cobros')->get();
    }
}