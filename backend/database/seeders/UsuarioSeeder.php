<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;
class UsuarioSeeder extends Seeder

{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('usuarios')->insert([
            [
                'nombre'=>'juan',
                'apellido'=>'marcos',
                'codigo_sis'=>'123456789',
                'correo'=>'email1@gmail.com',
                'telefono'=>'4321542',
                'contrasena'=>'passwords1',
                'id_rol'=>'1'
            ],
            [
                'nombre'=>'carlos',
                'apellido'=>'illanes',
                'codigo_sis'=>'123746789',
                'correo'=>'email2@gmail.com',
                'telefono'=>'4085542',
                'contrasena'=>'passwords2',
                'id_rol'=>'1'
            ],
            [
                'nombre'=>'marcelo',
                'apellido'=>'perez',
                'codigo_sis'=>'962746789',
                'correo'=>'otroemail2@gmail.com',
                'telefono'=>'0931263',
                'contrasena'=>'passwords3',
                'id_rol'=>'1'
            ]

        ]);
    }
}
