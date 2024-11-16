<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DocenteTest extends TestCase
{

    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_docentes(): void
    {
        $response = $this->get('/api/docente');

        $response->assertStatus(200);
    }

    public function test_registar_docentes_correcto(): void
    {
        $response = $this->postJson(
            '/api/docente',
            [
                "nombre" => "samaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "apellido" => "navia",
                "codigo_sis" => "202304236",
                "correo" => "yoemail@gmail.com",
                "telefono" => "7302542",
                "contrasena" => "cosas"
            ]
        );

        $response->assertStatus(200);
    }

    public function test_registar_docentes_fallido(): void
    {
        $response = $this->postJson(
            '/api/docente',
            [
                "nombre" => "samaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "apellido" => "navia",
                "codigo_sis" => "202304236",
                "correo" => "yoemail@gmail.com",
                "telefono" => "7302542",
                "contrasena" => "cosas"
            ]
        );

        $response->assertStatus(422);
    }
    public function test_mostar_docente_exitoso(): void
    {
        $response = $this->get('/api/docente/14');
        $response->assertStatus(200);
    }

    public function test_mostar_docente_fallido(): void
    {
        $response = $this->get('/api/docente/1');
        $response->assertStatus(404);
    }

    public function test_modificar_docente_exitoso(): void
    {
        $response = $this->putJson(
            '/api/docente/14',
            [
                "correo" => "email2709@gmail.com"
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_docente_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/docente/1',
            [
                "correo" => "email2709@gmail.com"
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_docente_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/docente/10',
            [
                "correo" => "yoemail@gmail.com",
                "codigo_sis" => "962746789",
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_docente_exito(): void
    {
        $response = $this->delete('/api/docente/14');
        $response->assertStatus(200);
    }

    public function test_eliminar_docente_fallido(): void
    {
        $response = $this->delete('/api/docente/1');
        $response->assertStatus(404);
    }
}
