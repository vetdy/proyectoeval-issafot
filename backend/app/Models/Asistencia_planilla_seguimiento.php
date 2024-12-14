<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia_planilla_seguimiento extends Model
{
    protected $table = 'asistencia_planilla_seguimiento';
    use HasFactory;
    protected $fillable = ['presente', 'observacion', 'id_planilla_seguimiento', 'id_usuario'];
}
