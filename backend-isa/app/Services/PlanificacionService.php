<?php

namespace App\Services;

use App\Models\Asistencia_evaluacion;
use App\Models\Asistencia_planilla_seguimiento;
use App\Models\Empresa;
use App\Models\Evaluacion;
use App\Models\Item_planilla;
use App\Models\Planilla_seguimiento;
use App\Models\Proyecto;
use App\Models\Proyecto_empresa;
use App\Models\Semestre;
use App\Models\Socio_empresa;
use Illuminate\Support\Carbon;

class PlanificacionService
{
    # dia puede ser 1->lunes, 2->martes... 7-> domingo
    public function getProximoDiaRevision($fecha, $diaDeLaSemana)
    {
        $fecha = Carbon::parse($fecha);
        if ($fecha->dayOfWeek === $diaDeLaSemana) {
            return $fecha;
        }
        return $fecha->next($diaDeLaSemana)->toDateString();
    }
    public function getAnteriorFecha($fecha, $diaDeLaSemana)
    {
        $fecha = Carbon::parse($fecha);

        // Si la fecha es el día de la semana deseado, devuélvela tal cual
        if ($fecha->dayOfWeek === $diaDeLaSemana) {
            return $fecha->toDateString();
        }

        // Si no, retrocede al último día de la semana antes de la fecha
        return $fecha->previous($diaDeLaSemana)->toDateString();
    }

    public function checkFechaValida($idProyectoEmpresa){

        $fechaHoy= Carbon::now();
        $proyectoEmpresa= Proyecto_empresa::find($idProyectoEmpresa);
        $proyecto=Proyecto::find($proyectoEmpresa->id_proyecto);
        $semestre=Semestre::find($proyecto->id_semestre);
        $fechaMaximo = Carbon::parse($semestre->fecha_generacion);
        return $fechaMaximo->gte($fechaHoy);

    }
}
