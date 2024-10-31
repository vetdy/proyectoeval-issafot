<?php

namespace App\Services;

use App\Models\Asistencia_evaluacion;
use App\Models\Asistencia_planilla_seguimiento;
use App\Models\Empresa;
use App\Models\Evaluacion;
use App\Models\Item_planilla;
use App\Models\Planilla_seguimiento;
use App\Models\Proyecto_empresa;
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


    public function registarPlanillaSeguimiento($registar)
    {
        $dia = (int)$registar['dia_revision'];
        $fecha_inicio = Carbon::createFromDate($registar['fecha_inicio']);
        $fecha_fin = Carbon::createFromDate($this->getAnteriorFecha($registar['fecha_fin'], $dia));
        $fecha_inicio = Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio, $dia));

        while ($fecha_inicio->lt($fecha_fin)) {
            $pg = new Planilla_seguimiento();
            $pg->titulo = $registar['titulo'];
            $pg->fecha_revision = $fecha_inicio->toDateString();
            $pg->hora_revision = $registar['hora_revision'];
            $pg->id_proyecto_empresa = $registar['id_proyecto_empresa'];
            $pg->save();
            $fecha_inicio->addDay();
            $fecha_inicio = Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio, $dia));
        }
        $e = new Evaluacion();
        $e->titulo = $registar['titulo'];
        $e->fecha_revision = $fecha_inicio->toDateString();
        $e->hora_revision = $registar['hora_revision'];
        $e->id_empresa = $registar['id_proyecto_empresa']; // modificar
        $e->id_tipo_evaluacion = '1';

        $e->save();

        foreach (Socio_empresa::where('id_empresa', $e->id_empresa)->get() as $id_usuario) {
            $ae = new Asistencia_evaluacion();
            $ae->id_usuario = $id_usuario->id;
            $ae->id_evaluacion = $e->id;
            $ae->save();
        }
    }

    public function registarPlanillaSeguimientoItems($registar, $tareas, $h, $d, $pe)
    {

        $dia = (int)$d;
        $fecha_inicio = Carbon::createFromDate($registar['fecha_inicio']);
        $fecha_fin = Carbon::createFromDate($this->getAnteriorFecha($registar['fecha_fin'], $dia));
        $fecha_inicio = Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio, $dia));
        $id_empresa_ax = Proyecto_empresa::find($pe)->id_empresa;
        while ($fecha_inicio->lt($fecha_fin)) {

            $pg = new Planilla_seguimiento();
            $pg->titulo = $registar['titulo'];
            $pg->fecha_revision = $fecha_inicio->toDateString();
            $pg->hora_revision = $h;
            $pg->id_proyecto_empresa = $pe;
            $pg->save();
            foreach ($tareas as $tarea) {
                $ta = new Item_planilla();
                $ta->titulo = $tarea;
                $ta->id_planilla_seguimiento = $pg->id;
                $ta->save();
            }
            $fecha_inicio->addDay();
            $fecha_inicio = Carbon::createFromDate($this->getProximoDiaRevision($fecha_inicio, $dia));

            foreach (Socio_empresa::where('id_empresa', $id_empresa_ax)->get() as $id_usuario) {
                $aps = new Asistencia_planilla_seguimiento();
                $aps->id_usuario = $id_usuario->id_usuario;
                $aps->id_planilla_seguimiento = $pg->id;
                $aps->save();
            }
        }

        $e = new Evaluacion();
        $e->titulo = $registar['titulo'];
        $e->fecha_revision = $fecha_inicio->toDateString();
        $e->hora_revision = $h;
        $e->id_empresa = $id_empresa_ax; //modificar
        $e->id_tipo_evaluacion = '1';

        $e->save();

        foreach (Socio_empresa::where('id_empresa', $e->id_empresa)->get() as $id_usuario) {
            $ae = new Asistencia_evaluacion();
            $ae->id_usuario = $id_usuario->id_usuario;
            $ae->id_evaluacion = $e->id;
            $ae->save();
        }
    }
}
