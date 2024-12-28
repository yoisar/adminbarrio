<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expensa extends Model
{
    use HasFactory;

    // Nombre de la tabla (opcional si sigue la convención de Laravel)
    protected $table = 'expensas';

    // Atributos que se pueden asignar en masa
    protected $fillable = [
        'monto_total',
        'fecha',
        'detalle',
    ];

    // Relación con Cobros (una expensa puede tener múltiples cobros)
    public function cobros()
    {
        return $this->hasMany(Cobro::class);
    }
}