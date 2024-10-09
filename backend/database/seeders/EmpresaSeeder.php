<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;
class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $usuarios=[[
            'nombre'=>'mateo',
            'apellido'=>'corina',
            'codigo_sis'=>'800252789',
            'correo'=>'emaila32@gmail.com',
            'telefono'=>'4320972',
            'contrasena'=>'passwords11',
            'id_rol'=>'2'
        ],
        [
            'nombre'=>'carla',
            'apellido'=>'millanes',
            'codigo_sis'=>'124146429',
            'correo'=>'email12@gmail.com',
            'telefono'=>'4567542',
            'contrasena'=>'passwords21',
            'id_rol'=>'2'
        ],
        [
            'nombre'=>'marcos',
            'apellido'=>'millanes',
            'codigo_sis'=>'414146429',
            'correo'=>'e123ail12@gmail.com',
            'telefono'=>'4589542',
            'contrasena'=>'passwords211',
            'id_rol'=>'2'
        ],
        [
            'nombre'=>'mariaa',
            'apellido'=>'jaldines',
            'codigo_sis'=>'124146899',
            'correo'=>'passl12@gmail.com',
            'telefono'=>'4519542',
            'contrasena'=>'password212',
            'id_rol'=>'2'
        ]
    ];
        foreach ($usuarios as $usuario) {
            $ids[] = DB::table('usuarios')->insertGetId($usuario);
        }
        $socio_empresas=[['id_usuario'=>$ids[0]],['id_usuario'=>$ids[1]]];
        foreach ($socio_empresas as $socio_empresa) {
            $ids3[] = DB::table('socio_empresas')->insertGetId($socio_empresa);
        }
        $empresas=[
            [
                'nombre_corto'=>'techoSol',
                'nombre_largo'=>'tecnologia de soluciones',
                'correo'=>'email1@gmail.com',
                'telefono'=>'4321542',
                'url_logo'=>'url/uno',
                'id_representante_legal'=>$ids[0]
            ],
            [
                'nombre_corto'=>'IssaSoft',
                'nombre_largo'=>'Inovacion software soluciones agiles de software',
                'correo'=>'e12il1@gmail.com',
                'telefono'=>'43091542',
                'url_logo'=>'url/dos',
                'id_representante_legal'=>$ids[1]
            ],

        ];
        foreach ($empresas as $empresa) {
            $ids2[] = DB::table('empresas')->insertGetId($empresa);
        }
        
        DB::table('socio_empresas')->
        where('id',$ids3[0])
        ->update(
                ['id_empresa'=>$ids2[0],
            ]
        );
        DB::table('socio_empresas')->
        where('id',$ids3[1])
        ->update(
            [
                'id_empresa'=>$ids2[1],
            ]);
        DB::table('socio_empresas')->insert([
            ['id_usuario'=>$ids[2],
            'id_empresa'=>$ids2[0]],
            ['id_usuario'=>$ids[3],
            'id_empresa'=>$ids2[0]
            ]]);
    }
}
