<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class PlantillaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plantilla_seguimientos')->insert([
            [
                'titulo'=>'presencial',
                'fecha_revision'=>'2019/10/28',
                'hora_revision'=>'18:00',
                'id_empresa'=>'1'
            ],
            [
                'titulo'=>'revision 1',
                'fecha_revision'=>'2019/10/28',
                'hora_revision'=>'18:00',
                'id_empresa'=>'1'
            ],
            [
                'titulo'=>'revision 2',
                'fecha_revision'=>'2019/10/28',
                'hora_revision'=>'18:00',
                'id_empresa'=>'1'
            ],

        ]);
        DB::table('item_plantillas')->insert([
            [
                'titulo'=>'product backlog',
                'id_plantilla'=>'1'
            ],
            [
                'titulo'=>'historias de usuario revisadas',
                'id_plantilla'=>'2'
            ],
            [
                'titulo'=>'Sprint backlog',
                'id_plantilla'=>'3'
            ],
        ]);
    }
}
