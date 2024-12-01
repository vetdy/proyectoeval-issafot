<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rols')->insert([
            [
                'nombre' => 'docente',
                'descripcion' => 'persona que se encarga de Tis'
            ],
            [
                'nombre' => 'usuario',
                'descripcion' => 'persona comun'
            ],
            [
                'nombre' => 'administrador',
                'descripcion' => 'persona que se encarga de administrar'
            ]
        ]);
    }
}
