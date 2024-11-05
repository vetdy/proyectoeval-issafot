<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoPlanificacion extends Model
{
    protected $table = 'estado_planificacion';
    use HasFactory;
    protected $fillable = ['estado','descripcion'];
    
}
