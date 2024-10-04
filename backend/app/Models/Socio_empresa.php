<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class socio_empresa extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    public function rempresa(){
        return $this->hasOne(Empresa::class);
    }
    public function usuario(){
        return $this->hasOne(Usuario::class);
    }
    
}
