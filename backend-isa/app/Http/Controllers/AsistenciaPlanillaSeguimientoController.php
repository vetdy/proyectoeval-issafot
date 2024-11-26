<?php

namespace App\Http\Controllers;

use App\Models\Asistencia_planilla_seguimiento;
use Illuminate\Http\Request;

class AsistenciaPlanillaSeguimientoController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Put(
     *     path="/api/asistencia_planilla_seguimiento/{id}",
     *     summary="Actualizar una asistencia",
     *     tags={"Asistencia Planilla Seguimiento"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del asistencia planilla seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="presente", type="boolean", example=true),
     *             @OA\Property(property="observacion", type="string", example="no tiene todos los datos"),
     * 
     *              )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="asistencia modificada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Asistencia no encontrada"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'presente'=> 'nullable|boolean',
                'observacion'=>'nullable|max:1024', 
            ]);
            $data = $request->only(['presente', 'observacion']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $asistencia = Asistencia_planilla_seguimiento::find($id);
        if ($asistencia) {
            $asistencia->update($data);
            return response()->json(['contenido' => 'se actualizo a la asistencia con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no se encontro el id'], 404);
        }
    }
}
