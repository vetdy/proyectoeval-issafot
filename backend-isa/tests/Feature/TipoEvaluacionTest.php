<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TipoEvaluacionTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_lista_tipo_evaluaciones(): void
    {
        $response = $this->get('/api/tipo_evaluacion');

        $response->assertStatus(200);
    }

    public function test_crear_tipo_evaluaciones(): void
    {
        $response = $this->postJson('/api/tipo_evaluacion', [
            'nombre' => 'cruzada grupo',
            'descripcion' => 'tarea entre miembros del equipo'
        ]);

        $response->assertStatus(200);
    }

    public function test_crear_tipo_evaluaciones_fallido(): void
    {
        $response = $this->postJson('/api/tipo_evaluacion', [
            'nombres' => 'cruzada grupo',
            'descripcion' => 'tarea entre miembros del equipo'
        ]);

        $response->assertStatus(422);
    }

    public function test_mostar_un_tipo_evaluaciones_exitoso(): void
    {
        $response = $this->get('/api/tipo_evaluacion/1');

        $response->assertStatus(200);
    }

    public function test_mostar_un_tipo_evaluaciones_fallido(): void
    {
        $response = $this->get('/api/tipo_evaluacion/10');

        $response->assertStatus(404);
    }
    public function test_actualizar_tipo_evaluaciones_exitoso(): void
    {
        $response = $this->putJson('/api/tipo_evaluacion/1', [
            'nombre' => 'cruzada grupo',
            'descripcion' => 'tarea entre miembros del equipos'
        ]);

        $response->assertStatus(200);
    }

    public function test_actualizar_tipo_evaluaciones_fallido_dato(): void
    {
        $response = $this->putJson('/api/tipo_evaluacion/1', [
            'nombre' => 'nombre super largo que no puede ser procesado por el backend sobre error',
            'descripcion' => '1'
        ]);

        $response->assertStatus(422);
    }

    public function test_actualizar_tipo_evaluaciones_fallido_id(): void
    {
        $response = $this->putJson('/api/tipo_evaluacion/10', [
            'nombre' => 'cruzada grupo',
            'descripcion' => 'tarea entre miembros del equipo'
        ]);

        $response->assertStatus(404);
    }
}
