<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'barrio_id',
        'puesto',
        'salario',
        'fecha_contratacion',
        'activo',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function barrio()
    {
        return $this->belongsTo(Barrio::class, 'barrio_id');
    }
}
