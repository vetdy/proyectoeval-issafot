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
        
        $docentes=Docente::all();
        return response()->json(['mensage',compact('docentes')]);
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
        $docente = Docente::find($id);
        return response()->json(['mensaje',compact('docente')]);
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
        $request->validate([
            'nombre' => 'nullable|max:64',
            'apellido' => 'nullable|max:64',
            'CI' => 'nullable|max:15',
            'codigoSiss' => 'nullable|max:15',
            'contrasena' => 'nullable|max:225',
        ]);
        $docente = Docente::find($id);
        $docente->update($request->all());
        return response()->json(['mensaje','se actualizo con exito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $docente = Docente::find($id);
        $docente->delete();
        return response()->json(['mensaje','eliminado con exito']);
    }
}
