<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarrioEmpleado extends Model
{
    use HasFactory;

    protected $table = 'barrio_empleado';

    protected $fillable = [
        'user_id',
        'barrio_id',
    ];

    /**
     * Get the user that owns the BarrioEmpleado.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the barrio that owns the BarrioEmpleado.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }
}