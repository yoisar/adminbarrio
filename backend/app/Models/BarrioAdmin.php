<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarrioAdmin extends Model
{
    use HasFactory;

    protected $table = 'barrio_admin';

    protected $fillable = [
        'user_id',
        'barrio_id',
        'default', // Asegurarse de incluir el campo 'default'
    ];

    /**
     * Get the user that owns the BarrioAdmin.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the barrio that owns the BarrioAdmin.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }
}