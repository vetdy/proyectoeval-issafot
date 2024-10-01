<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plantilla_seguimiento;
use Exception;

class PlantillaSeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $plantilla_seguimiento=Plantilla_seguimiento::all();
        
        return response()->json(['mensaje',compact('plantilla_seguimiento')]);
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
            $request->validate([
                'titulo'=>'required|max:64',
                'fecha_revision'=>'required|date',
                'hora_revision'=>'required|time',
                'id_empresa'=>'required|exists:empresas.id'
            ]);
            $plantilla_seguimiento = Plantilla_seguimiento::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        return response()->json(['mensaje','se registro exitosamente a la plantilla seguimiento',200]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $plantilla_seguimiento=Plantilla_seguimiento::find($id);
        return response()->json(['mensaje',compact('plantilla_seguimiento')]);
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
            'titulo'=>'nullable|max:64',
            'fecha_revision'=>'nullable|date',
            'hora_revision'=>'nullable|time',
            'id_empresa'=>'nullable|exists:empresas.id'
        ]);
        try{
            $plantilla_seguimiento=Plantilla_seguimiento::find($id);
            $plantilla_seguimiento->update($request->all());
            return response()->json(['mensaje','se actualizo a la Plantilla_seguimiento con exito'],200);
        }catch (\Illuminate\Database\QueryException $e){
            return response()->json(['mensaje','el id no existe'],404);
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
        $plantilla_seguimiento=Plantilla_seguimiento::find($id);
        $plantilla_seguimiento->delete();
        return response()->json(['mensaje','eliminado con exito']);
    }
}
