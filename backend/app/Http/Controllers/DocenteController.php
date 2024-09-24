<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln($request);
        $request->validate([
            'nombre' => 'required|max:64',
            'apellido' => 'required|max:64',
            'CI' => 'required|max:15',
            'codigoSiss' => 'required|max:15',
            'contrasena' => 'required|max:225',
        ]);
        
        $docente = new Docente();
        $docente ->nombre =$request['nombre'];
        $docente ->apellido =$request['apellido'];
        $docente ->cedula_identidad =$request['CI'];
        $docente ->codigo_Siss=$request['codigoSiss'];
        $docente ->contrasena=bcrypt($request['contrasena']);
        $docente->save();
        return response()->json(['mensaje','se registro exitosamente el docente',200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
