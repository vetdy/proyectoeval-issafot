<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tarea=Tarea::all();
        return response()->json(['contenido'=>compact('tarea'),200]);
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
            $request->validate(['terminado'=>'required|boolean',
                'descripcion'=>'required|max:64',
                'observacion'=>'required|max:255',
                'terminado'=>'required|boolean',
                ]);
            $tarea = Tarea::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>'se registro exitosamente la tarea'],200);
   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tarea=Tarea::find($id);
        return response()->json(['contenido'=>compact('tarea')],200);
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
        $request->validate(['terminado'=>'required|boolean',
                'descripcion'=>'required|max:64',
                'observacion'=>'required|max:255',
                'terminado'=>'required|boolean',
                ]);
        
        try{
            $tarea=Tarea::find($id);
            $tarea->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la tarea con exito'],200);
        }catch (\Illuminate\Database\QueryException $e){
            return response()->json(['contenido'=>'el id no existe'],404);
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
        $tarea=Tarea::find($id);
        if ($tarea){
            $tarea->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la tarea'],404);
        }
    }
}
