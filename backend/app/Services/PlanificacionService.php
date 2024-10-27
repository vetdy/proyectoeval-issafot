<?php
namespace App\Services;

use App\Models\Asistencia_planilla_seguimiento;
use App\Models\Evaluacion;
use App\Models\Item_planilla;
use App\Models\Planilla_seguimiento;
use App\Models\Proyecto_empresa;
use App\Models\Socio_empresa;
use Illuminate\Support\Carbon;

class PlanificacionService
{
    # dia puede ser 1->lunes, 2->martes... 7-> domingo
    public function getProximoDiaRevision($fecha, $diaDeLaSemana) {
        $fecha = Carbon::parse($fecha);
        if ($fecha->dayOfWeek === $diaDeLaSemana) {
            return $fecha;
        }
        return $fecha->next($diaDeLaSemana)->toDateString();
    }

    public function registarPlanillaSeguimiento($registar){
        $dia=(int)$registar['dia_revision'];
        $fecha_inicio=Carbon::createFromDate($registar['fecha_inicio']);
        $fecha_fin=Carbon::createFromDate($registar['fecha_fin']);
        $fecha_inicio=Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio,$dia));
        
        while($fecha_inicio->lte($fecha_fin)){
            $pg=new Planilla_seguimiento();
            $pg->titulo=$registar['titulo'];
            $pg->fecha_revision=$fecha_inicio->toDateString();
            $pg->hora_revision=$registar['hora_revision'];
            $pg->id_empresa=Proyecto_empresa::find($registar['id_proyecto_empresa'])->id_empresa;
            $pg->save();
            $fecha_inicio->addDay();
            $fecha_inicio=Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio,$dia));
        }
    }

    public function registarPlanillaSeguimientoItems($registar,$tareas,$h,$d,$pe){
        
        $dia=(int)$d;
        $fecha_inicio=Carbon::createFromDate($registar['fecha_inicio']);
        $fecha_fin=Carbon::createFromDate($registar['fecha_fin']);
        $fecha_inicio=Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio,$dia));
        while($fecha_inicio->lt($fecha_fin)){
            
            $pg=new Planilla_seguimiento();
            $pg->titulo=$registar['titulo'];
            $pg->fecha_revision=$fecha_inicio->toDateString();
            $pg->hora_revision=$h;
            $pg->id_empresa=Proyecto_empresa::find($pe)->id_empresa;
            $pg->save();
            foreach ($tareas as $tarea){
                $ta=new Item_planilla();
                $ta->titulo=$tarea;
                $ta->id_planilla_seguimiento=$pg->id;
                $ta->save();
            } 
            $fecha_inicio->addDay();
            $fecha_inicio=Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio,$dia));
            
            foreach(Socio_empresa::where('id_empresa',$pg->id_empresa)->get() as $id_usuario ){
                $aps=new Asistencia_planilla_seguimiento();
                $aps->id_usuario=$id_usuario->id;
                $aps->id_planilla_seguimiento=$pg->id;
                $aps->save();
                
            }
            
            
        }
        
    }

    
}
