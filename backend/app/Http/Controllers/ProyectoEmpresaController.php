<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Proyecto;
use App\Models\Proyecto_empresa;
use Illuminate\Http\Request;

class ProyectoEmpresaController extends Controller
{
    
    public function show_empresa($id){
        $proyecto_por_empresa=[];
        $proyectoEmpresas=Proyecto_empresa::where('id_empresa',$id)->get();
        if(!$proyectoEmpresas->isEmpty()){
            foreach($proyectoEmpresas as $proyectoEmpresa){
                $proyecto=Proyecto::find($proyectoEmpresa->id_proyecto);
                $proyect = new \stdClass();
                $proyect->id_proyecto=$proyecto->id;
                $proyect->nombre_proyecto=$proyecto->nombre;
                $proyect->creado_por_usuario=$proyecto->id_creado_por;
                $proyect->habilitado=$proyectoEmpresa->habilitado;
                $proyecto_por_empresa[]=$proyect;
            }
            return response()->json(['contenido' => compact('proyecto_por_empresa')], 200);
        }else{
            return response()->json(['contenido' => 'no se encuentra la empresa'],404 );
        }
    }

   
}
