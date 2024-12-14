<?php

namespace App\Services;

use App\Models\Revision_planificacion;
use Illuminate\Support\Facades\Storage;
class ProyectoEmpresaService
{
    /**
     * Obtiene la extensión de la imagen según su tipo.
     *
     * @param string $type
     * @return string
     */
    public function createRevisionPlanificacion($id)
    {
     $rp=new Revision_planificacion();
     $rp->id_proyecto_empresa=$id;
     $rp->save();
    }

    
}
