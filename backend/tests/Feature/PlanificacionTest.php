<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlanificacionTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_planificaciones(): void
    {
        $response = $this->get('/api/planificacion');

        $response->assertStatus(200);
    }

    public function test_registar_planificacion_correcto(): void
    {

        $response = $this->postJson(
            '/api/planificacion',
            [
                'titulo' => 'Sprint 1',
                'dia_revision' => '1',
                'hora_revision' => '18:30',
                'fecha_inicio' => '2024-10-20',
                'fecha_fin' => '2024-10-27',
                'id_proyecto_empresa' => '1',
            ]
        );
        $response->assertStatus(200);
    }

    public function test_registar_planificacion_fallido(): void
    {
        $response = $this->postJson(
            '/api/planificacion',
            [
                'titulo' => 'Sprint 1',
                'dia_revision' => '2024-11-20',
                'hora_revision' => '18:30',
                'id_proyecto_empresa' => '10',
            ]
        );

        $response->assertStatus(422);
    }
    public function test_mostar_planificacion_exitoso(): void
    {
        $response = $this->get('/api/planificacion/4');
        $response->assertStatus(200);
    }

    public function test_mostar_planificacion_fallido(): void
    {
        $response = $this->get('/api/planificacion/99');
        $response->assertStatus(404);
    }

    public function test_modificar_planificacion_exitoso(): void
    {
        $response = $this->putJson(
            '/api/planificacion/4',
            [
                "titulo" => "Mejora sprint1",
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_planificacion_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/planificacion/99',
            [
                'id_proyecto_empresa' => '1'
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_planificacion_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/planificacion/4',
            [
                "titulo" => "Mejora sprint1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_planificacion_exito(): void
    {
        $response = $this->delete('/api/planificacion/4');
        $response->assertStatus(200);
    }

    public function test_eliminar_planificacion_fallido(): void
    {
        $response = $this->delete('/api/planificacion/11');
        $response->assertStatus(404);
    }


    public function test_registar_planificacion_tareas_exitoso(): void
    {
        $response = $this->postJson(
            '/api/planificacion_tareas',
            [
                "planificacion" => [
                    [
                        "titulo" => "Planificación 1",
                        "tarea" => [
                            "Tarea 1 de Planificación 1",
                            "Tarea 2 de Planificación 1"
                        ],
                        "fecha_inicio" => "2024-10-01",
                        "fecha_fin" => "2024-10-29"
                    ],
                    [
                        "titulo" => "Planificación 2",
                        "tarea" => [
                            "Tarea 1 de Planificación 2",
                            "Tarea 2 de Planificación 2"
                        ],
                        "fecha_inicio" => "2024-11-01",
                        "fecha_fin" => "2024-11-29"
                    ]
                ],
                "dia_revision" => 2,
                "hora_revision" => "14:00",
                "id_proyecto_empresa" => 1
            ]
        );
        $response->assertStatus(200);
    }

    public function test_registar_planificacion_tareas_fallido_dato(): void
    {
        $response = $this->postJson(
            '/api/planificacion_tareas',
            [
                "planificacion" => [
                    [
                        "titulo" => "Planificación 1",
                        "tarea" => [
                            "Tarea 1 de Planificación 1",
                            "Tarea 2 de Planificación 1"
                        ],
                        "fecha_inicio" => "nofecha",
                        "fecha_fin" => "2024-10-29"
                    ],
                    [
                        "titulo" => "Planificación 2",
                        "tarea" => [
                            "Tarea 1 de Planificación 2",
                            "Tarea 2 de Planificación 2"
                        ],
                        "fecha_inicio" => "2024-11-01",
                        "fecha_fin" => "2024-11-29"
                    ]
                ],
                "dia_revision" => 2,
                "hora_revision" => "14:00",
                "id_proyecto_empresa" => 1
            ]
        );
        $response->assertStatus(422);
    }
}
