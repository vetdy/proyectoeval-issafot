<?php

namespace App\Services;

use App\Models\Asistencia_evaluacion;
use App\Models\Asistencia_planilla_seguimiento;
use App\Models\Empresa;
use App\Models\Evaluacion;
use App\Models\Item_planificacion;
use App\Models\Item_planilla;
use App\Models\Planilla_seguimiento;
use App\Models\Proyecto_empresa;
use App\Models\Socio_empresa;
use App\Models\Tarea;
use Illuminate\Support\Carbon;

class PlanillaSeguimientoService
{
    # dia puede ser 1->lunes, 2->martes... 7-> domingo


    public function registarPlanillaSeguimiento($registar)
    {
        $planillaService = new PlanificacionService;
        $dia = (int)$registar['dia_revision'];
        $fecha_inicio = Carbon::createFromDate($registar['fecha_inicio']);
        $fecha_fin = Carbon::createFromDate($planillaService->getAnteriorFecha($registar['fecha_fin'], $dia));
        $fecha_inicio = Carbon::createFromDate($planillaService->getProximoDiaRevision($fecha_inicio, $dia));
        #($fecha_fin,$fecha_fin);
        while ($fecha_inicio->lt($fecha_fin)) {
            $pg = new Planilla_seguimiento();
            
            $pg->titulo = $registar['titulo'];
            $pg->fecha_revision = $fecha_inicio->toDateString();
            $pg->hora_revision = $registar['hora_revision'];
            $pg->id_proyecto_empresa = $registar['id_proyecto_empresa'];
            $pg->save();
            $tareas=Item_planificacion::where('id_planificacion',$registar['id'])->get();
            foreach ($tareas as $tarea) {
                $ta = new Item_planilla();
                $ta->titulo = $tarea->nombre;
                $ta->id_planilla_seguimiento = $pg->id;
                $ta->save();
            }
            $pe=Proyecto_empresa::find($pg->id_proyecto_empresa);
            
            foreach (Socio_empresa::where('id_empresa',$pe->id_empresa)->get() as $id_usuario) {
                $ape = new Asistencia_planilla_seguimiento();
                $ape->id_usuario = $id_usuario->id;
                $ape->id_planilla_seguimiento = $pg->id;
                $ape->save();
            }
            $fecha_inicio->addDay();
            $fecha_inicio = Carbon::createFromDate($planillaService->getProximoDiaRevision($fecha_inicio, $dia));
        }
        $e = new Evaluacion();
        $e->titulo = $registar['titulo'];
        $e->fecha_revision = $fecha_inicio->toDateString();
        $e->hora_revision = $registar['hora_revision'];
        $e->id_proyecto_empresa = $registar['id_proyecto_empresa']; // modificar
        $e->id_tipo_evaluacion = '1';

        $e->save();
        
        foreach (Socio_empresa::where('id_empresa', $e->id_empresa)->get() as $id_usuario) {
            $ae = new Asistencia_evaluacion();
            $ae->id_usuario = $id_usuario->id;
            $ae->id_evaluacion = $e->id;
            $ae->save();
        }
        // tareas
        $tareas=Item_planificacion::where('id_planificacion',$registar['id'])->get();
        
        foreach($tareas as $tarea){
            $t=new Tarea();
            $t->titulo=$tarea->nombre;
            $t->id_evaluacion=$e->id;
            $t->save();
        }
    }

}
