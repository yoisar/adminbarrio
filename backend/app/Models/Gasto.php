<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    protected $fillable = [
        'barrio_id',        
        'categoria_gasto_id',
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
     * Get the categoria that owns the gasto.
     */
    public function categoria()
    {
        return $this->belongsTo(CategoriaGasto::class, 'categoria_gasto_id');
    }
}