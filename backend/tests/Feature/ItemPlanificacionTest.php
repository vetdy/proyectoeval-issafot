<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ItemPlanificacionTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_item_planificaciones(): void
    {
        $response = $this->get('/api/item_planificacion');

        $response->assertStatus(200);
    }

    public function test_registar_item_planificacion_correcto(): void
    {
        $response = $this->postJson(
            '/api/item_planificacion',
            [
                "nombre" => "Item 1",
                "id_planificacion" => 2,
            ]
        );

        $response->assertStatus(200);
    }

    public function test_registar_item_planificacion_fallido(): void
    {
        $response = $this->postJson(
            '/api/item_planificacion',
            [
                "nombre" => "Item 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "id_planificacion" => 0,
                "fecha_inicio" => "2024-03-20",
                "fecha_fin" => "2024-04-20"
            ]
        );

        $response->assertStatus(422);
    }
    public function test_mostar_item_planificacion_exitoso(): void
    {
        $response = $this->get('/api/item_planificacion/1');
        $response->assertStatus(200);
    }

    public function test_mostar_item_planificacion_fallido(): void
    {
        $response = $this->get('/api/item_planificacion/99');
        $response->assertStatus(404);
    }

    public function test_modificar_item_planificacion_exitoso(): void
    {
        $response = $this->putJson(
            '/api/item_planificacion/1',
            [
                'nombre' => 'Item1'
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_item_planificacion_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/item_planificacion/99',
            [
                "id_planificacion" => 99,
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_item_planificacion_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/item_planificacion/1',
            [
                "nombre" => "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_item_planificacion_exito(): void
    {
        $response = $this->delete('/api/item_planificacion/1');
        $response->assertStatus(200);
    }

    public function test_eliminar_item_planificacion_fallido(): void
    {
        $response = $this->delete('/api/item_planificacion/99');
        $response->assertStatus(404);
    }
}
