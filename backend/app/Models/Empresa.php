<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['nombre_corto','nombre_largo','telefono','correo','url_logo'];
    public function representante_legal(){
        return $this->hasMany(Socio_empresa::class);
    }
    
   
}

