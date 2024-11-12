<?php

namespace App\Http\Controllers;

use App\Models\Item_planilla;
use Illuminate\Cache\Repository;
use Illuminate\Http\Request;

class ItemPlanillaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_planilla",
     *     summary="Obtiene una lista de items planilla",
     *     tags={"Item planillas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de de items planilla",
     *     )
     * )
     */
    public function index()
    {
        $item_planilla = Item_planilla::all();
        return response()->json(['contenido' => compact('item_planilla')], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/item_planilla",
     *     summary="Crear un nuevo Item planilla",
     *     tags={"Item planillas"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","id_planilla"},
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_planilla", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Item planilla creado con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'titulo' => 'required|max:32',
                'observacion' => 'required|max:255',
                'id_planilla_seguimiento' => 'required|exists:planilla_seguimientos,id'
            ]);
            $item_planilla = Item_planilla::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => compact('item_planilla')], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\item_planilla  $item_planilla
     * @return \Illuminate\Http\Response
     */
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_planilla/{id}",
     *     summary="Mostar un item planilla",
     *     tags={"Item planillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del item planilla"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item planilla no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $item_planilla = Item_planilla::find($id);
        if ($item_planilla) {
            return response()->json(['contenido' => compact('item_planilla')], 200);
        } else {
            return response()->json(['contenido' => 'id item planilla no existe'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\item_planilla  $item_planilla
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/item_planilla/{id}",
     *     summary="Actualizar un item planilla",
     *     tags={"Item planillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_planilla", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item planilla actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="item planilla no encontrado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'titulo' => 'nullable|max:32',
                'observacion' => 'nullable|max:255',

            ]);
            $data = $request->only(['titulo', 'observacion',]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $item_planilla = Item_planilla::find($id);
        if ($item_planilla) {
            $item_planilla->update($data);
            return response()->json(['contenido' => 'se actualizo la item planilla'], 200);
        } else {
            return response()->json(['contenido' => 'id no encontrado'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\item_planilla  $item_planilla
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/item_planilla/{id}",
     *     summary="Eliminar un item planilla",
     *     tags={"Item planillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item planilla eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item planilla no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $item_planilla = Item_planilla::find($id);
        if ($item_planilla) {
            $item_planilla->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe el item planilla'], 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_planilla/planilla_seguimiento/{id}",
     *     summary="Mostar una lista item planilla por planilla seguimiento",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del item planilla por planilla seguimiento"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="planilla no encontrada"
     *     )
     * 
     * )
     */
    public function show_planilla_seguimiento($id)
    {
        $item_planilla = Item_planilla::where('id_planilla_seguimiento', $id)->get();
        if (!$item_planilla->isEmpty()) {
            return response()->json(['contenido' => compact('item_planilla')], 200);
        } else {
            return response()->json(['contenido' => 'id planilla seguimiento no existe'], 404);
        }
    }
}
