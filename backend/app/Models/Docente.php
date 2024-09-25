<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class docente extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['nombre','apellido','cedula_identidad','codigo_Siss','contrasena'];
   
}
