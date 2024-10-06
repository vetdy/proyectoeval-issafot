<?php

namespace App\Http\Controllers;

use App\Models\Item_plantilla;
use Illuminate\Cache\Repository;
use Illuminate\Http\Request;

class ItemPlantillaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item_plantilla=Item_plantilla::all();
        return response()->json(['contenido'=>compact('item_plantilla')],200);
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
                'titulo'=>'required|max:32',
                'id_planilla'=>'required|exist:plantillas_segimientos.id'
            ]);
            $item_plantilla=Item_plantilla::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>compact('item_plantilla')],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\item_plantilla  $item_plantilla
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item_plantilla=Item_plantilla::find($id);
        return response()->json(['contenido'=>compact('item_plantilla')],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\item_plantilla  $item_plantilla
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo'=>'nullable|max:32',
            'id_planilla'=>'nullable|exist:plantillas_segimientos.id'
        
        ]);
        $item_plantilla=Item_plantilla::find($id);
        if($item_plantilla){
            $item_plantilla->update($request->all());
            return response()->json(['contenido'=>'se actualizo la item plantilla'],200);
        }else{
            return response()->json(['contenido'=>'id no encontrado'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\item_plantilla  $item_plantilla
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item_plantilla=Item_plantilla::find($id);
        if($item_plantilla){
            $item_plantilla->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe el item plantilla'],404);
        }
    }
}
