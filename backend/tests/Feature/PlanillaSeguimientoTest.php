<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlanillaSeguimientoTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_planilla_seguimientoes(): void
    {
        $response = $this->get('/api/planilla_seguimiento');

        $response->assertStatus(200);
    }

    public function test_registar_planilla_seguimiento_correcto(): void
    {

        $response = $this->postJson(
            '/api/planilla_seguimiento',
            [
                'titulo' => 'revision sprint1',
                'fecha_revision' => '23-10-2024',
                'hora_revision' => '13:00',
                'id_proyecto_empresa' => '1'
            ]
        );
        #dd($response->json());
        $response->assertStatus(200);
    }

    public function test_registar_planilla_seguimiento_fallido(): void
    {
        $response = $this->postJson(
            '/api/planilla_seguimiento',
            [
                'titulo' => 'revision sprint1',
                'fecha_revision' => '23-10-2024',
                'id_empresa' => '1'
            ]
        );

        $response->assertStatus(422);
    }
    public function test_mostar_planilla_seguimiento_exitoso(): void
    {
        $response = $this->get('/api/planilla_seguimiento/3');
        $response->assertStatus(200);
    }

    public function test_mostar_planilla_seguimiento_fallido(): void
    {
        $response = $this->get('/api/planilla_seguimiento/99');
        $response->assertStatus(404);
    }

    public function test_modificar_planilla_seguimiento_exitoso(): void
    {
        $response = $this->putJson(
            '/api/planilla_seguimiento/3',
            [
                "titulo" => "Mejora sprint1",
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_planilla_seguimiento_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/planilla_seguimiento/99',
            [
                'titulo' => '2111111111111111'
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_planilla_seguimiento_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/planilla_seguimiento/3',
            [
                'fecha_revision' => '2111111111111111111111111111111111111111111111111'
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_planilla_seguimiento_exito(): void
    {
        $response = $this->delete('/api/planilla_seguimiento/3');
        $response->assertStatus(200);
    }

    public function test_eliminar_planilla_seguimiento_fallido(): void
    {
        $response = $this->delete('/api/planilla_seguimiento/3');
        $response->assertStatus(404);
    }

    public function test_mostar_por_empresa_exitoso(): void
    {
        $response = $this->get('/api/planilla_seguimiento/empresa/1');
        $response->assertStatus(200);
    }

    public function test_mostar_por_empresa_fallido(): void
    {
        $response = $this->get('/api/planilla_seguimiento/empresa/2');
        $response->assertStatus(404);
    }
    public function test_mostar_por_semana_exitoso(): void
    {
        $response = $this->get('/api/planilla_seguimiento/semana/1');
        $response->assertStatus(200);
    }
    public function test_mostar_por_semana_fallido(): void
    {
        $response = $this->get('/api/planilla_seguimiento/semana/99');
        $response->assertStatus(404);
    }
}
