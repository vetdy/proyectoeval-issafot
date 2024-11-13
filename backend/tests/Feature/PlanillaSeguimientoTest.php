<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
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
                'id_proyecto_empresa' => '3'
            ]
        );
        $response->assertStatus(200);
    }

    public function test_registar_planilla_seguimiento_fallido(): void
    {
        $response = $this->postJson(
            '/api/planilla_seguimiento',
            [
                'titulo' => 'revision sprint1',
                'fecha_revision' => '23-10-2024',
                'id_empresa' => '3'
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
        $response = $this->get('/api/planilla_seguimiento/empresa/3');
        $response->assertStatus(200);
    }

    public function test_mostar_por_empresa_fallido(): void
    {
        $response = $this->get('/api/planilla_seguimiento/empresa/99');
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
    public function test_crear_planilla_exitoso(): void
    {
        $p = DB::table('planificaciones')->insertGetId([
            'titulo' => 'sprint 1',
            "dia_revision" => 3,
            'hora_revision' => '12:00',
            'id_proyecto_empresa' => 1,
            'fecha_inicio' => '2024-11-3',
            'fecha_fin' => '2024-12-30'
        ]);
        
        $response = $this->patch("/api/planilla_seguimiento/crear/1");
        $response->assertStatus(200);
    }
    public function test_crear_planilla_fallido(): void
    {
        $p = DB::table('planificaciones')->insertGetId([
            'titulo' => 'sprint 1',
            "dia_revision" => 3,
            'hora_revision' => '12:00',
            'id_proyecto_empresa' => 1,
            'fecha_inicio' => '2024-11-3',
            'fecha_fin' => '2024-12-30'
        ]);
        $e = DB::table('proyecto_empresas')->where('id', 1)->first();
        $response = $this->patch("/api/planilla_seguimiento/crear/99");
        $response->assertStatus(404);
    }
}
