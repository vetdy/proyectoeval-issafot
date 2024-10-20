<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use Illuminate\Support\Facades\Log;
/**
* @OA\Info(title="API proyecto EVA", version="1.0")
*
* @OA\Server(url="http://127.0.0.1:8000")
*/
class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/docente",
     *     summary="Obtiene una lista de los docentes",
     *     tags={"Docentes"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de docentes"
     *      )
     *     
     * )
     */
    public function index()
    {
        
        $docentes=Docente::all();
        return response()->json(['contenido'=>compact('docentes')],200);
    }

    /**
     * @OA\Post(
     *     path="/api/docente",
     *     summary="Crear un nuevo docente",
     *     tags={"Docentes"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","apellido","codigo_sis", "correo","telefono","contrasena"},
     *             @OA\Property(property="nombre", type="string", example="Juan"),
     *             @OA\Property(property="apellido", type="string", example="Marcos"),
     *             @OA\Property(property="codigo_sis", type="string", example="202503657"),
     *             @OA\Property(property="correo", type="string", example="juan@correo.com"),
     *             @OA\Property(property="telefono", type="string", example="4307845"),
     *             @OA\Property(property="contrasena", type="string", example="password"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Docente creado con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store(Request $request)
{
    Log::info('Datos recibidos:', $request->all());


    try {
        // Validación de los campos
        $validator = $request->validate([
            'nombre' => 'required|max:32',
            'apellido' => 'required|max:32',
            'codigo_sis' => 'required|digits:9|unique:usuarios,codigo_sis', // Verifica la unicidad en la tabla 'docentes'
            'correo' => 'required|email|max:32|unique:usuarios,correo', // Verifica la unicidad en la tabla 'docentes'
            'telefono' => 'required|max:32',
            'contrasena' => 'required|max:225',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Devuelve los errores de validación, incluyendo duplicados
        return response()->json([
            'contenido' => $e->errors(),
        ], 422);
    }

    try {
        // Crear el nuevo registro de docente

        $docente = new Docente();
        $docente->nombre = $request['nombre'];
        $docente->apellido = $request['apellido'];
        $docente->codigo_sis = $request['codigo_sis'];
        $docente->correo = $request['correo'];
        $docente->telefono = $request['telefono'];
        $docente->id_rol = 1; // El usuario docente tiene id 1
        $docente->contrasena = bcrypt($request['contrasena']);
        $docente->save();

        // Respuesta de éxito
        return response()->json([
            'contenido' => 'Se registró exitosamente el docente',
        ], 200);

    } catch (\Exception $e) {
        // Captura errores inesperados y devuelve una respuesta genérica
        Log::error('Error al registrar docente: ' . $e->getMessage());
        return response()->json([
            'contenido' => 'Ocurrió un error al registrar el docente. Inténtelo de nuevo más tarde.',
        ], 500);
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
     *     path="/api/docente/{id}",
     *     summary="Mostar un docente",
     *     tags={"Docentes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del docente",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del docente"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Docente no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $docente = Docente::find($id);
        if ($docente){
            return response()->json(['contenido'=>compact('docente')],200);
        }
        else{
            return response()->json(['contenido'=>'id docente no existe'],404);
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
     *     path="/api/docente/{id}",
     *     summary="Actualizar un docente",
     *     tags={"Docentes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del docente",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             
     *             @OA\Property(property="nombre", type="string", example="Juan"),
     *             @OA\Property(property="apellido", type="string", example="Marcos"),
     *             @OA\Property(property="codigo_sis", type="string", example="202503657"),
     *             @OA\Property(property="correo", type="string", example="juan@correo.com"),
     *             @OA\Property(property="telefono", type="string", example="4307845"),
     *             @OA\Property(property="contrasena", type="string", example="password"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Docente actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Docente no encontrado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        try{
            $request->validate([
                'nombre' => 'nullable|max:64',
                'apellido' => 'nullable|max:64',
                'codigo_sis' => 'nullable|max:15',
                'email'=>'nullable|max:32',
                'telefono'=>'nullable|max:32',
                'contrasena' => 'nullable|max:225',
            ]);
        }catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        
            $docente = Docente::find($id);
            if (!$docente){
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
    /**
     * @OA\Delete(
     *     path="/api/docente/{id}",
     *     summary="Eliminar un docente",
     *     tags={"Docentes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del docente",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Docente eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Docente no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $docente = Docente::find($id);
        if (!$docente){
            return response()->json(['contenido'=>'no se encontro el id'],404);
        }else{
            $docente->delete();
            return response()->json(['contenido'=>'se elimino con exito'],200);
        }
    }
}
