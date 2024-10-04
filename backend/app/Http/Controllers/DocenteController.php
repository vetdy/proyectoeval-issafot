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
        return response()->json(['contenido'=>compact('docentes')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $validor=$request->validate([
                'nombre' => 'required|max:32',
                'apellido' => 'required|max:32',
                'codigo_sis' => 'required|max:9',
                'correo'=>'required|max:32',
                'telefono'=>'required|max:32',
                'contrasena' => 'required|max:225',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        
        $docente = new Docente();
        $docente ->nombre =$request['nombre'];
        $docente ->apellido =$request['apellido'];
        $docente ->codigo_sis =$request['codigo_sis'];
        $docente ->correo=$request['correo'];
        $docente ->telefono=$request['telefono'];
        $docente ->id_rol='1';// el usuario docente tiene id 1
        $docente ->contrasena=bcrypt($request['contrasena']);
        $docente->save();
        return response()->json(['contenido'=>'se registro exitosamente el docente'],200);
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
        return response()->json(['contenido'=>compact('docente')],200);
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
            'codigo_sis' => 'nullable|max:15',
            'email'=>'nullable|max:32',
            'telefono'=>'nullable|max:32',
            'contrasena' => 'nullable|max:225',
        ]);
        
            $docente = Docente::find($id);
            if ($docente== null){
                return response()->json(['contenido'=>'no se encontro el id'],404);
            }else{
                $docente->update($request->all());
                return response()->json(['contenido'=>'se actualizo con exito'],200);
            }
        
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
        if ($docente== null){
            return response()->json(['contenido'=>'no se encontro el id'],404);
        }else{
            $docente->delete();
            return response()->json(['contenido'=>'se elimino con exito'],200);
        }
    }
}
