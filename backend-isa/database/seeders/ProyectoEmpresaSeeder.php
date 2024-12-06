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
        DB::table('estado_planificacion')->insert([
            [
                'estado' => 'no existe',
                'descripcion' => 'la planificacion no existe'
            ],
            [
                'estado' => 'en revision',
                'descripcion' => 'la planificacion esta en revision'
            ],
            [
                'estado' => 'aceptado',
                'descripcion' => 'la planificacion fue aceptado'
            ],
            [
                'estado' => 'rechazado',
                'descripcion' => 'la planificacion fue rechazada'
            ]
        ]);
        DB::table('estado_contratos')->insert([
            [
                'nombre' => 'activo',
                'descripcion' => 'este estado se produce cuando sigue activo',
            ],
            [
                'nombre' => 'pendiente',
                'descripcion' => 'este estado se produce cuando no se termina el proyecto',
            ],

        ]);
        DB::table('semestre')->insert([
            [
                'fecha_inicio' => '2024-10-10',
                'fecha_generacion' => '2024-10-28',
                'fecha_seguimiento' => '2024-11-2',
                'fecha_evaluacion' => '2024-12-1',
                'fecha_fin' => '2024-12-20'
            ],
            [
                'fecha_inicio' => '2024-11-20',
                'fecha_generacion' => '2024-11-28',
                'fecha_seguimiento' => '2024-12-4',
                'fecha_evaluacion' => '2025-2-2',
                'fecha_fin' => '2025-2-20'
            ],
            [
                'fecha_inicio' => '2024-12-2',
                'fecha_generacion' => '2024-12-20',
                'fecha_seguimiento' => '2025-1-4',
                'fecha_evaluacion' => '2025-2-10',
                'fecha_fin' => '2025-2-20'
            ]
        ]);
        DB::table('proyectos')->insert([
            [
                'nombre' => 'proyecto de creacion de ambientes',
                'descripcion' => 'este proyecto consiste en crear una ambientes con sus estudiantes',
                'codigo' => 'PCA-01',
                'fecha_inicio' => '2024-10-10',
                'fecha_cierre' => '2024-12-20',
                'id_creado_por' => "1",
                'id_semestre'=>'1'
            ],
            [
                'nombre' => 'proyecto de gestion de aulas',
                'descripcion' => 'este proyecto consiste en gestionar aulas en la universidad',
                'codigo' => 'PGA-01',
                'fecha_inicio' => '2024-11-20',
                'fecha_cierre' => '2025-2-20',
                'id_creado_por' => "1",
                'id_semestre'=>'2'
            ],
            [
                'nombre' => 'proyecto de creacion de pagina de videos',
                'descripcion' => 'este proyecto consiste en crear una web para subida y reproducion de videos',
                'codigo' => 'PPV-01',
                'fecha_inicio' => '2024-12-2',
                'fecha_cierre' => '2025-2-20',
                'id_creado_por' => "1",
                'id_semestre'=>'3'
            ]
        ]);
        DB::table('proyecto_empresas')->insert([
            [
                'habilitado' => true,
                'id_proyecto' => '1',
                'id_empresa' => '1',
                'id_estado_contrato' => '1'
            ],
            [
                'habilitado' => true,
                'id_proyecto' => '1',
                'id_empresa' => '2',
                'id_estado_contrato' => '1'
            ],
            [
                'habilitado' => true,
                'id_proyecto' => '2',
                'id_empresa' => '3',
                'id_estado_contrato' => '1'
            ],
            [
                'habilitado' => true,
                'id_proyecto' => '3',
                'id_empresa' => '4',
                'id_estado_contrato' => '1'
            ],
        ]);
        DB::table('revision_planificacion')->insert([
            [
                'id_estado_planificacion' => 1,
                'id_proyecto_empresa' => 1
            ],
            [
                'id_estado_planificacion' => 3,
                'id_proyecto_empresa' => 2
            ],
            [
                'id_estado_planificacion' => 4,
                'id_proyecto_empresa' => 3
            ],
            [
                'id_estado_planificacion' => 1,
                'id_proyecto_empresa' => 4
            ]
        ]);
    }
}
