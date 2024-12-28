<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    // Nombre de la tabla (opcional si sigue la convención de Laravel)
    protected $table = 'gastos';

    // Atributos que se pueden asignar en masa
    protected $fillable = [
        'descripcion',
        'monto',
        'tipo',
        'fecha',
    ];
}