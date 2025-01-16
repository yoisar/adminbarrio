<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubcategoriaGasto extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria_gasto_id',
        'nombre',
        'descripcion',
    ];

    public function categoria()
    {
        return $this->belongsTo(CategoriaGasto::class, 'categoria_gasto_id');
    }
}