<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AsistenciaPlanillaSeguimientoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_modificar_asistencia_planilla_seguimiento_exitoso(): void
    {
        
        
        $response = $this->putJson(
            '/api/asistencia_planilla_seguimiento/3',
            [
                "presente" => true
            ]
        );
        $response->assertStatus(200);
    }
    public function test_modificar_asistencia_planilla_seguimiento_fallido(): void
    {
        $response = $this->putJson(
            '/api/asistencia_planilla_seguimiento/99',
            [
                "presente" => true,
            ]
        );
        $response->assertStatus(404);
    }
}
