<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plantilla_seguimiento extends Model
{
    use HasFactory;
    protected $fillable=['titulo',];

    public function empresa(){
        return $this->hasOne(Empresa::class);
    }
}
