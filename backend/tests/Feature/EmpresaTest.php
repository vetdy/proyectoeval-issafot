<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmpresaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_empresas(): void
    {
        $response = $this->get('/api/empresa');

        $response->assertStatus(200);
    }

    public function test_registar_empresa_correcto(): void
    {
        $response = $this->postJson(
            '/api/empresa',
            [
                "nombre_corto" => "ISSA",
                "nombre_largo" => "Inovasion de solucion software amigable",
                "id_usuario" => "14",
                "correo" => "ISSA@correo.com",
                "telefono" => "4305445",
                "imagen" => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QABwAGAAamjb7oAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AoICzEL5B0y2gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAOBSURBVHja7dxPSJt3HMfxd6PEhAiB9bIeViQXD9qDEEVQFi8KIsIiJiz4pxnr2VNHoqzYdEhguoIddhayCutJc1qX4Hr2tECzxGMEc1hYWTFbwWASY/LsMJSu2o5ko7rt84bf5eFLHp7fK+R5kkMutZjNBurCZNIWCEQJRCBKIAJRAhGIEohAlECUQASiBCIQJRCBKIEIRAlECUQgSiACUQIRiBKIQJRAlEAEogQiECUQgSiBCEQJRAlEIEogAlH/RZCV+/cplkqsPnjwp+OBYJAfUyl+ef6c/UKBn58944dEgtuh0KnXqGf2uK9WVymWSvz24gWd164J5E19cfcu8/PzmEwmFhYW6O/vJxwOYzKZCAQCfOB2NzT7cgMDAxQKBSwWCzMzM+d6vc0XHWR0dJRKpcL4+Dg7mQwA6VSKL+/dYyMapVqtNjR73PT167S1tbGxsUFfXx8ul0sgb8pqtVIsFk82+OW8Hk/Ds8f5fD7K5TLLy8uUy2Wmpqb4+MYNvo5E9JF1VtlsFrvdzjePHmGz2f6xWYB3r1zB6XSSTCZJPn3K4uIixWIRr9ere8jrCoVCZLNZPB4PP+VypNJpvovFCASDf2sWIBgI0Nrayvr6OgA7mQyJRAKn08l7V6+ey/U2NTc13b4omz8yMkJXVxfpdJpYLPbHu353l5WVFfL5PIeHh7S0tNDZ2cnw8DA+n49kMkkul6t7FuDzxUX29/f5yO8/OWYAY2NjWK1WNjc33/4mtJjNxkVZkUjEqNVqxtra2l/OxuNxo1arGVtbWw3NTkxMGNVq1ajVameunZ2dc9mDf+0Xw6nJSY6OjnA4HA3NTk9PUygUsFosp9bS0hIOh4MPfT7dQ17t+ydP6O3tPXX8fZeL5uZmSqVS3bM2m42enh4yZzyNAaw9fEilUmFyclKPva/W0dHBt48fE4/HiUaj7O3tMTg4iN/vxzCMk3tNPbOf3rqF3W4nlUqdec7d3V2y2Szd3d28c/kyv+bzAjlubm4Or9eLy+XC7XZjNps5ODggl8sRDof57M6dumeHhoYwDINoNPra825vb9Pe3s7s7Cyf3Lz51q73kv4mVj8uKoEIRAlEIEogAlECEYgSiBKIQJRABKIEIhAlEIEogSiBCEQJRCBKIAJRAhGIEogSiECUQASiBCIQJRCBKIEogQhECUQgSiACUQL5//U7xBcHwU6U9OAAAAAASUVORK5CYII="
            ]
        );

        $response->assertStatus(200);
    }

    public function test_registar_empresa_fallido(): void
    {
        $response = $this->postJson(
            '/api/empresa',
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
    public function test_mostar_empresa_exitoso(): void
    {
        $response = $this->get('/api/empresa/3');
        $response->assertStatus(200);
    }

    public function test_mostar_empresa_fallido(): void
    {
        $response = $this->get('/api/empresa/6');
        $response->assertStatus(404);
    }

    public function test_modificar_empresa_exitoso(): void
    {
        $response = $this->putJson(
            '/api/empresa/3',
            [
                "correo" => "ISSAsoft@correo.com"
            ]
        );
        $response->assertStatus(200);
    }

    public function test_modificar_empresa_fallido_id(): void
    {
        $response = $this->putJson(
            '/api/empresa/14',
            [
                "correo" => "email2709@gmail.com"
            ]
        );
        $response->assertStatus(404);
    }

    public function test_modificar_empresa_fallido_dato(): void
    {
        $response = $this->putJson(
            '/api/empresa/3',
            [
                "nombre_corto" => "IssaSoft"
            ]
        );
        $response->assertStatus(422);
    }


    public function test_eliminar_empresa_exito(): void
    {
        $response = $this->delete('/api/empresa/2');
        $response->assertStatus(200);
    }

    public function test_eliminar_empresa_fallido(): void
    {
        $response = $this->delete('/api/empresa/11');
        $response->assertStatus(404);
    }
}
