<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Socio_empresa;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empresa=Empresa::all();
        return response()->json(['mensaje',compact('empresa')]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $request->validate([
            'nombre_corto'=>'required|max:64',
            'nombre_largo'=>'required|max:64',
            'telefono'=>'required|max:64',
            'correo'=>'required|max:64',
            'url_logo'=>'required|max:64',
            'id_usuario'=>'required|integer'
        ]);
        $socio_empresa = new Socio_empresa();
        $socio_empresa->id_usuario = $request->input('id_usuario');
        $socio_empresa->save();

    // Crear Empresa
        $empresa = new Empresa();
        $empresa->nombre_corto = $request->input('nombre_corto');
        $empresa->nombre_largo = $request->input('nombre_largo');
        $empresa->telefono = $request->input('telefono');
        $empresa->url_logo = $request->input('url_logo');
        $empresa->correo= $request->input('correo');
        $empresa->id_representante_legal = $socio_empresa->id; 
        $empresa->save();
        
        
        $socio_empresa->id_empresa = $empresa->id;
        $socio_empresa->save();
        
        return response()->json(['mensaje','se registro exitosamente a la empresa']);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $empresa=Empresa::find($id);
        return response()->json(['mensaje',compact('empresa')]);
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
            'nombre_corto'=>'nullable|max:64',
            'nombre_largo'=>'nullable|max:64',
            'telefono'=>'nullable|max:64',
            'correo'=>'nullable|max:64',
            'url_logo'=>'nullable|max:64',
            'id_representante_legal'=>'nullable|exists:socio_empresa,id'
        ]);
        $empresa=Empresa::find($id);
        $empresa->update($request->all());
        return response()->json(['mensaje','se actualizo a la empresa con exito']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empresa=Empresa::find($id);
        $empresa->delete();
        return response()->json(['mensaje','eliminado con exito']);
    }
}
