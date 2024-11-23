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
    /**
     * @OA\Get(
     *     path="/api/tarea",
     *     summary="Obtiene una lista de los Tareas",
     *     tags={"Tareas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de Tareas"
     *      )
     *     
     * )
     */
    public function index()
    {
        $tarea = Tarea::all();
        return response()->json(['contenido' => compact('tarea'), 200]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Post(
     *     path="/api/tarea",
     *     summary="Crear un nuevo Tarea",
     *     tags={"Tareas"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"terminado","descripcion","observacion"},
     *             @OA\Property(property="terminado", type="boolean", example="true"),
     *             @OA\Property(property="descripcion", type="string", example="Presentar la base de datos"),
     *             @OA\Property(property="observacion", type="string", example="no llega a cumplir los criterios de la hu")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tarea creada con éxito"
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
                'titulo' => 'required|max:64',
                'id_evaluacion' => 'required|exists:evaluacions,id'
            ]);
            $tarea = Tarea::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'se registro exitosamente la tarea'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/tarea/{id}",
     *     summary="Mostar un Tarea",
     *     tags={"Tareas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Tarea",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos de la Tarea"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Tarea no encontrada"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $tarea = Tarea::find($id);
        if ($tarea) {
            return response()->json(['contenido' => compact('tarea')], 200);
        } else {
            return response()->json(['contenido' => 'id tarea no existe'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/tarea/{id}",
     *     summary="Actualizar un Tarea",
     *     tags={"Tareas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Tarea",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *            @OA\Property(property="terminado", type="boolean", example="true"),
     *             @OA\Property(property="descripcion", type="string", example="Presentar la base de datos"),
     *             @OA\Property(property="observacion", type="string", example="no llega a cumplir los criterios de la hu")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tarea actualizada con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tarea no encontrada"
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
                'nota' => 'nullable|integer',
                'titulo' => 'nullable|max:64',
                'observacion' => 'nullable|max:255',
            ]);
            $data = $request->only(['titulo', 'observacion', 'nota']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $tarea = Tarea::find($id);
        if ($tarea) {
            $tarea->update($data);
            return response()->json(['contenido' => 'se actualizo a la tarea con exito'], 200);
        } else {
            return response()->json(['contenido' => 'el id no existe'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/tarea/{id}",
     *     summary="Eliminar una Tarea",
     *     tags={"Tareas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Tarea",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tarea eliminada "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Tarea no encontrada"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $tarea = Tarea::find($id);
        if ($tarea) {
            $tarea->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe la tarea'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/tarea/lista",
     *     summary="Actualizar un Tarea",
     *     tags={"Tareas"},
     *     
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *            @OA\Property(property="terminado", type="boolean", example="true"),
     *             @OA\Property(property="descripcion", type="string", example="Presentar la base de datos"),
     *             @OA\Property(property="observacion", type="string", example="no llega a cumplir los criterios de la hu")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tareas agregadas con éxito",
     *     ),
     
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store_list(Request $request)
    {
        try {
            $request->validate([
                'tareas.*' => 'required|max:32',
                'id_evaluacion' => 'required|exists:evaluacions,id'
            ]);
            foreach ($request['tareas'] as $tarea) {
                $ta = new Tarea();
                $ta->titulo = $tarea;
                $ta->id_evaluacion = $request['id_evaluacion'];
                $ta->save();
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'Se creo a la tarea con exito'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/tarea/evaluacion/{id}",
     *     summary="Mostar una lista tareas por evaluacion",
     *     tags={"Tarea"},
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
     *         description="Datos del tarea por evaluacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="evaluacion no encontrada"
     *     )
     * 
     * )
     */
    public function show_evaluacion($id)
    {
        $tarea = Tarea::where('id_evaluacion', $id)->groupBy('id')->get();
        if (!$tarea->isEmpty()) {
            return response()->json(['contenido' => compact('tarea')], 200);
        } else {
            return response()->json(['contenido' => 'id planilla seguimiento no existe'], 404);
        }
    }
}
