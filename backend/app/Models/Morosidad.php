<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Morosidad extends Model
{
    use HasFactory;
    protected $table = 'morosidades';
    protected $fillable = [
        'unidad_funcional_id',
        'monto_total_adeudado',
        'fecha_ultima_notificacion',
        'estado',
    ];

    /**
     * Get the unidad funcional that owns the morosidad.
     */
    public function unidadFuncional()
    {
        return $this->belongsTo(UnidadFuncional::class);
    }

    /**
     * Get the expensas for the morosidad.
     */
    public function expensas()
    {
        return $this->belongsToMany(Expensa::class, 'morosidad_expensa', 'morosidad_id', 'expensa_id');
    }
}