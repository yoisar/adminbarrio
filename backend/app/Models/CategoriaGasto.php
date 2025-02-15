<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaGasto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }

    public function subcategorias()
    {
        return $this->hasMany(SubcategoriaGasto::class);
    }
}