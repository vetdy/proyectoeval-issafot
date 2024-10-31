<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia_evaluacion extends Model
{
    protected $table = 'asistencia_evaluacion';
    use HasFactory;
    protected $fillable = ['presente', 'observacion', 'id_evaluacion', 'id_usuario'];
}
