<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProyectoEmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estado_contratos')->insert([
            [
                'nombre'=>'activo',
                'descripcion'=>'este estado se produce cuando sigue activo',
            ],
            [
                'nombre'=>'pendiente',
                'descripcion'=>'este estado se produce cuando no se termina el proyecto',
            ],

        ]);
        DB::table('proyecto_empresas')->insert([
            [
                'habilitado'=>true,
                'id_proyecto'=>'1',
                'id_empresa'=>'1',
                'id_estado_contrato'=>'1'
            ],
            [
                'habilitado'=>true,
                'id_proyecto'=>'1',
                'id_empresa'=>'2',
                'id_estado_contrato'=>'1'
            ],
            [
                'habilitado'=>true,
                'id_proyecto'=>'1',
                'id_empresa'=>'3',
                'id_estado_contrato'=>'2'
            ],

        ]);
    }
}
