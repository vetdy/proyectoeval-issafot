<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semestre extends Model
{
    use HasFactory;
    protected $table = 'semestre';
    protected $fillable = ['fecha_inicio', 'fecha_generacion', 'fecha_seguimiento','fecha_evaluacion','fecha_fin'];
}
