<?php

namespace Database\Seeders;

use App\Http\Controllers\PlanillaSeguimientoController;
use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class PlanillaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ps=new PlanillaSeguimientoController();
        $ps->create_planilla(3);
        
        DB::table('item_planillas')->insert([
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '1',
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '1'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '1'
            ],
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '3'
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '3'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '3'
            ],

        ]);
    }
}
