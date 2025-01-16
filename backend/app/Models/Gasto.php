<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    protected $fillable = [
        'barrio_id',        
        'subcategoria_gasto_id',
        'descripcion',
        'monto',
        'fecha',
    ];

    /**
     * Get the barrio that owns the gasto.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }

    /**
     * Get the subcategoria that owns the gasto.
     */
    public function subcategoria()
    {
        return $this->belongsTo(SubcategoriaGasto::class, 'subcategoria_gasto_id');
    }
}