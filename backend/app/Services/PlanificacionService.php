<?php
namespace App\Services;

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
}
