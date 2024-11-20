<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'id_evaluacion'];
    public function evaluacion(){
        return $this->hasOne(Evaluacion::class);
    }
}
