<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiRequestLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'method',
        'headers',
        'body',
    ];

    protected $casts = [
        'headers' => 'array',
        'body' => 'array',
    ];
}