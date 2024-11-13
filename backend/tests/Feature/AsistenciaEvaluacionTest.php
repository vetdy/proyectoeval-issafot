<?php

namespace Tests\Feature;

use App\Http\Controllers\AsistenciaEvaluacion;
use App\Models\Asistencia_evaluacion;
use App\Models\Evaluacion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AsistenciaEvaluacionTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_modificar_asistencia_evaluacion_exitoso(): void
    {
        
        
        $response = $this->putJson(
            '/api/asistencia_evaluacion/3',
            [
                "presente" => true
            ]
        );
        $response->assertStatus(200);
    }
    public function test_modificar_asistencia_evaluacion_fallido(): void
    {
        $response = $this->putJson(
            '/api/asistencia_evaluacion/99',
            [
                "presente" => true,
            ]
        );
        $response->assertStatus(404);
    }
}
