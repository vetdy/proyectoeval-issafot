<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Proyecto;
use App\Models\Proyecto_empresa;
use App\Services\ProyectoEmpresaService;
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

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'habilitado'=>'nullable|boolean',
                "id_estado_contrato"=>'nullable|exists:estado_contrato,id'
            ]);
            $data = $request->only(['titulo', 'observacion',]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $item_planilla = Proyecto_empresa::find($id);
        if ($item_planilla) {
            $item_planilla->update($data);
            return response()->json(['contenido' => 'se actualizo la item planilla'], 200);
        } else {
            return response()->json(['contenido' => 'id no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            
            $request->validate([
                'habilitado' => 'required|max:32',
                'id_proyecto' => 'required|exists:proyecto,id',
                'id_empresa'=>'required|exists:empresa,id',
                "id_estado_contrato"=>'required|exits:estado_contrato'
            ]);
            $proyecto_empresa = Proyecto_empresa::create($request->all());
            $service_revision_planificacion=new ProyectoEmpresaService();
            $service_revision_planificacion->createRevisionPlanificacion($proyecto_empresa->id);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => compact('proyecto_empresa')], 200);
    }

   
}
