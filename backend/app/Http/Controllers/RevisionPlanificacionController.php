<?php

namespace App\Http\Controllers;

use App\Models\Revision_planificacion;
use Illuminate\Http\Request;

class RevisionPlanificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/revision_planificacion",
     *     summary="Obtiene una lista de los revision planificacion",
     *     tags={"Revision planificacion"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de revision planificacion"
     *      )
     *     
     * )
     */
    public function index()
    {

        $docentes = Revision_planificacion::all();
        return response()->json(['contenido' => compact('docentes')], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/revision_planificacion",
     *     summary="Crear un nueva revision Planificacion",
     *     tags={"Revision planificacion"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_proyecto_empresa",},
     *             @OA\Property(property="id_proyecto_empresa", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Revision Planificacion creada con éxito"
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
                'id_proyecto_empresa'=>'required|integer|exists:proyecto_empresas,id'
            ]);
            $planificacion = Revision_planificacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'se registro exitosamente la revision planificacion'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/R/{id}",
     *     summary="Mostar un Revision Planificacion",
     *     tags={"Revision Planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Revision Planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos de la Revision Planificacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Revision Planificacion no encontrada"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $revision_planificacion = Revision_planificacion::find($id);
        if ($revision_planificacion) {
            return response()->json(['contenido' => compact('revision_planificacion')], 200);
        } else {
            return response()->json(['contenido' => 'id Revision Planificacion no existe'], 404);
        }
    }

     /**
     * @OA\Put(
     *     path="/api/revision_planificacion/{id}",
     *     summary="Crear un nueva revision Planificacion",
     *     tags={"Revision planificacion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Revision Planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_proyecto_empresa",},
     *             @OA\Property(property="id_proyecto_empresa", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Revision Planificacion creada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Revision Planificacion no encontrada"
     *     ),
     *     
     * )
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'observacion' => 'nullable|max:255',
                'id_estado_planificacion' => 'nullable|integer|exists:estado_planificacion,id',
                
            ]);
            $validData = $request->only(['observacion', 'id_estado_planificacion']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $revision_planificacion = revision_planificacion::find($id);
        if ($revision_planificacion) {
            $revision_planificacion->update($validData);
            return response()->json(['contenido' => 'se actualizo a la revision planificacion con exito'], 200);
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
     *     path="/api/revision_planificacion/{id}",
     *     summary="Eliminar una Revision Planificacion",
     *     tags={"Revision Planificacion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Revision Planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Revision Planificacion eliminada "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Revision Planificacion no encontrada"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $revision_planificacion = Revision_planificacion::find($id);
        if ($revision_planificacion) {
            $revision_planificacion->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe la revision planificacion'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/revision_planificacion/{id}",
     *     summary="Mostar revision planificacion con el id proyecto empresa",
     *     tags={"Revision Planificacion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la proyecto empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalle Revision Planificacion "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="proyecto empresa no encontrada"
     *     )
     * 
     * )
     */
    public function show_proyecto_empresa($id)
    {
        $revision_planificacion = Revision_planificacion::where('id_proyecto_empresa',$id)->first();
        if ($revision_planificacion) {
            return response()->json(['contenido' => compact('revision_planificacion')], 200);
        } else {
            return response()->json(['contenido' => 'no existe la revision planificacion'], 404);
        }
    }

    public function cambioEnRevision($id){
        $revision_planificacion=Revision_planificacion::find($id);
        $estado=['id_estado_planificacion'=>2];
        $revision_planificacion->update($estado);
    }
}
