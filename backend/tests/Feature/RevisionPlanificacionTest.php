<?php

namespace Tests\Feature;

use App\Models\Empresa;
use App\Models\Proyecto_empresa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RevisionPlanificacionTest extends TestCase
{
    public function test_lista_revision_planificaciones(): void
    {
        $response = $this->get('/api/revision_planificacion');

        $response->assertStatus(200);
    }

    public function test_registar_revision_planificacion_correcto(): void
    {
        $u = DB::table('usuarios')->insertGetId([
            'nombre' => 'mateo',
            'apellido' => 'valiente',
            'codigo_sis' => '875124512',
            'correo' => 'e33@gmail.com',
            'telefono' => '4323372',
            'contrasena' => 'passwords12',
            'id_rol' => '2'
        ]);
        $e = Empresa::create([
            'nombre_corto' => 'PruebaTech',
            'nombre_largo' => 'tecnologia de prueba',
            'correo' => 'email43@gmail.com',
            'telefono' => '4322542',
            'url_logo' => 'url/ninguno',
            'id_representante_legal' => $u
        ]);
        $pe = Proyecto_empresa::create([
            'habilitado' => true,
            'id_proyecto' => '1',
            'id_empresa' => $e->id,
            'id_estado_contrato' => '1'
        ]);
        
        $response = $this->postJson(
            '/api/revision_planificacion',
            [
                "id_proyecto_empresa"=>$pe->id
            ]
        );

        $response->assertStatus(200);
    }

    public function test_registar_revision_planificacion_fallido(): void
    {
        $response = $this->postJson(
            '/api/revision_planificacion',
            [
                "nombre" => "Item 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "id_planificacion" => 0,
                "fecha_inicio" => "2024-03-20",
                "fecha_fin" => "2024-04-20"
            ]
        );

        $response->assertStatus(422);
    }
    public function test_mostar_revision_planificacion_exitoso(): void
    {
        $response = $this->get('/api/revision_planificacion/1');
        $response->assertStatus(200);
    }

    public function test_mostar_revision_planificacion_fallido(): void
    {
        $response = $this->get('/api/revision_planificacion/99');
        $response->assertStatus(404);
    }

    public function test_modificar_revision_planificacion_exitoso(): void
    {
        $response = $this->putJson(
            '/api/revision_planificacion/1',
            [
                'nombre' => 'Item1'
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_revision_planificacion_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/revision_planificacion/99',
            [
                "id_planificacion" => 99,
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_revision_planificacion_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/revision_planificacion/99',
            [
                "id_estado_planificacion" => "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_revision_planificacion_exito(): void
    {
        $response = $this->delete('/api/revision_planificacion/1');
        $response->assertStatus(200);
    }

    public function test_eliminar_revision_planificacion_fallido(): void
    {
        $response = $this->delete('/api/revision_planificacion/99');
        $response->assertStatus(404);
    }


    public function test_mostar_revision_planificacion_por_proyecto_empresa_exito(): void
    {
        $response = $this->get('/api/revision_planificacion/proyecto_empresa/2');
        $response->assertStatus(200);
    }

    public function test_mostar_revision_planificacion_por_proyecto_empresa_fallido(): void
    {
        $response = $this->get('/api/revision_planificacion/proyecto_empresa/99');
        $response->assertStatus(404);
    }
}
