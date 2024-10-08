<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Socio_empresa;
use Illuminate\Validation\Rule;
use App\Services\EmpresaService;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/empresa",
     *     summary="Obtiene una lista de los docentes",
     *     tags={"Empresas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de empresas",
     *     )
     * )
     */
    public function index()
    {
        $empresa=Empresa::all();
        return response()->json(['contenido'=>compact('empresa')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/empresa",
     *     summary="Crear un nueva empresa",
     *     tags={"Empresas"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre_corto","nombre_largo","id_usuario", "correo","telefono","imagen"},
     *             @OA\Property(property="nombre_corto", type="string", example="ISSA"),
     *             @OA\Property(property="nombre_largo", type="string", example="Inovasion de solucion software amigable"),
     *             @OA\Property(property="id_usuario", type="string", example="8"),
     *             @OA\Property(property="correo", type="string", example="ISSA@correo.com"),
     *             @OA\Property(property="telefono", type="string", example="4305445"),
     *             @OA\Property(property="imagen", type="string", example="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QABwAGAAamjb7oAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AoICzEL5B0y2gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAOBSURBVHja7dxPSJt3HMfxd6PEhAiB9bIeViQXD9qDEEVQFi8KIsIiJiz4pxnr2VNHoqzYdEhguoIddhayCutJc1qX4Hr2tECzxGMEc1hYWTFbwWASY/LsMJSu2o5ko7rt84bf5eFLHp7fK+R5kkMutZjNBurCZNIWCEQJRCBKIAJRAhGIEohAlECUQASiBCIQJRCBKIEIRAlECUQgSiACUQIRiBKIQJRAlEAEogQiECUQgSiBCEQJRAlEIEogAlH/RZCV+/cplkqsPnjwp+OBYJAfUyl+ef6c/UKBn58944dEgtuh0KnXqGf2uK9WVymWSvz24gWd164J5E19cfcu8/PzmEwmFhYW6O/vJxwOYzKZCAQCfOB2NzT7cgMDAxQKBSwWCzMzM+d6vc0XHWR0dJRKpcL4+Dg7mQwA6VSKL+/dYyMapVqtNjR73PT167S1tbGxsUFfXx8ul0sgb8pqtVIsFk82+OW8Hk/Ds8f5fD7K5TLLy8uUy2Wmpqb4+MYNvo5E9JF1VtlsFrvdzjePHmGz2f6xWYB3r1zB6XSSTCZJPn3K4uIixWIRr9ere8jrCoVCZLNZPB4PP+VypNJpvovFCASDf2sWIBgI0Nrayvr6OgA7mQyJRAKn08l7V6+ey/U2NTc13b4omz8yMkJXVxfpdJpYLPbHu353l5WVFfL5PIeHh7S0tNDZ2cnw8DA+n49kMkkul6t7FuDzxUX29/f5yO8/OWYAY2NjWK1WNjc33/4mtJjNxkVZkUjEqNVqxtra2l/OxuNxo1arGVtbWw3NTkxMGNVq1ajVameunZ2dc9mDf+0Xw6nJSY6OjnA4HA3NTk9PUygUsFosp9bS0hIOh4MPfT7dQ17t+ydP6O3tPXX8fZeL5uZmSqVS3bM2m42enh4yZzyNAaw9fEilUmFyclKPva/W0dHBt48fE4/HiUaj7O3tMTg4iN/vxzCMk3tNPbOf3rqF3W4nlUqdec7d3V2y2Szd3d28c/kyv+bzAjlubm4Or9eLy+XC7XZjNps5ODggl8sRDof57M6dumeHhoYwDINoNPra825vb9Pe3s7s7Cyf3Lz51q73kv4mVj8uKoEIRAlEIEogAlECEYgSiBKIQJRABKIEIhAlEIEogSiBCEQJRCBKIAJRAhGIEogSiECUQASiBCIQJRCBKIEogQhECUQgSiACUQL5//U7xBcHwU6U9OAAAAAASUVORK5CYII="),
     *              )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Empresa creada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store(Request $request)
    {
        

        try{
            $request->validate([
                'nombre_corto'=>'required|max:64|unique:empresas',
                'nombre_largo'=>'required|max:128|unique:empresas',
                'telefono'=>'required|max:64',
                'correo'=>'required|max:64',
                'id_usuario' => [
                'required',
                'integer',
                'unique:socio_empresas',
                Rule::exists('usuarios', 'id')->where(function ($query) {
            $query->where('id_rol', 2);
        })
    ],
                'imagen' => 'required|string',
            ]);
            
          
// Crear Empresa
            $empresa = new Empresa();
            $empresaService=new EmpresaService();
            $archivo=$request->input('imagen');
            $rutaPublica=$empresaService->storeImage($archivo,$request->input('nombre_corto'),null);
            if ($rutaPublica){
                $empresa->url_logo = $rutaPublica;
            }else{
                return response()->json(['contenido'=>'no se pudo guardar la imagen'],422);
            }
        
            
            $empresa->nombre_corto = $request->input('nombre_corto');
            $empresa->nombre_largo = $request->input('nombre_largo');
            $empresa->telefono = $request->input('telefono');
            $empresa->correo= $request->input('correo');
            $empresa->id_representante_legal = $request->input('id_usuario'); 
            $empresa->save();


            
            $socio_empresa = new Socio_empresa();
            $socio_empresa->id_usuario = $request->input('id_usuario');
            $socio_empresa->id_empresa = $empresa->id;
            $socio_empresa->save();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()],422);
        }
        
        return response()->json(['contenido'=>'se registro la empresa con exito'],200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/empresa/{id}",
     *     summary="Mostar una empresa",
     *     tags={"Empresas"},
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
     *         description="Datos de una empresa"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Empresa no encontrada"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $empresa=Empresa::find($id);
        return response()->json(['contendido'=>compact('empresa')],200);
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
     *     path="/api/empresa/{id}",
     *     summary="Actualizar una empresa",
     *     tags={"Empresas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre_corto", type="string", example="ISSA"),
     *             @OA\Property(property="nombre_largo", type="string", example="Inovasion de solucion software amigable"),
     *             @OA\Property(property="id_usuario", type="string", example="8"),
     *             @OA\Property(property="correo", type="string", example="ISSA@correo.com"),
     *             @OA\Property(property="telefono", type="string", example="4305445"),
     *             @OA\Property(property="imagen", type="string", example="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QABwAGAAamjb7oAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AoICzEL5B0y2gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAOBSURBVHja7dxPSJt3HMfxd6PEhAiB9bIeViQXD9qDEEVQFi8KIsIiJiz4pxnr2VNHoqzYdEhguoIddhayCutJc1qX4Hr2tECzxGMEc1hYWTFbwWASY/LsMJSu2o5ko7rt84bf5eFLHp7fK+R5kkMutZjNBurCZNIWCEQJRCBKIAJRAhGIEohAlECUQASiBCIQJRCBKIEIRAlECUQgSiACUQIRiBKIQJRAlEAEogQiECUQgSiBCEQJRAlEIEogAlH/RZCV+/cplkqsPnjwp+OBYJAfUyl+ef6c/UKBn58944dEgtuh0KnXqGf2uK9WVymWSvz24gWd164J5E19cfcu8/PzmEwmFhYW6O/vJxwOYzKZCAQCfOB2NzT7cgMDAxQKBSwWCzMzM+d6vc0XHWR0dJRKpcL4+Dg7mQwA6VSKL+/dYyMapVqtNjR73PT167S1tbGxsUFfXx8ul0sgb8pqtVIsFk82+OW8Hk/Ds8f5fD7K5TLLy8uUy2Wmpqb4+MYNvo5E9JF1VtlsFrvdzjePHmGz2f6xWYB3r1zB6XSSTCZJPn3K4uIixWIRr9ere8jrCoVCZLNZPB4PP+VypNJpvovFCASDf2sWIBgI0Nrayvr6OgA7mQyJRAKn08l7V6+ey/U2NTc13b4omz8yMkJXVxfpdJpYLPbHu353l5WVFfL5PIeHh7S0tNDZ2cnw8DA+n49kMkkul6t7FuDzxUX29/f5yO8/OWYAY2NjWK1WNjc33/4mtJjNxkVZkUjEqNVqxtra2l/OxuNxo1arGVtbWw3NTkxMGNVq1ajVameunZ2dc9mDf+0Xw6nJSY6OjnA4HA3NTk9PUygUsFosp9bS0hIOh4MPfT7dQ17t+ydP6O3tPXX8fZeL5uZmSqVS3bM2m42enh4yZzyNAaw9fEilUmFyclKPva/W0dHBt48fE4/HiUaj7O3tMTg4iN/vxzCMk3tNPbOf3rqF3W4nlUqdec7d3V2y2Szd3d28c/kyv+bzAjlubm4Or9eLy+XC7XZjNps5ODggl8sRDof57M6dumeHhoYwDINoNPra825vb9Pe3s7s7Cyf3Lz51q73kv4mVj8uKoEIRAlEIEogAlECEYgSiBKIQJRABKIEIhAlEIEogSiBCEQJRCBKIAJRAhGIEogSiECUQASiBCIQJRCBKIEogQhECUQgSiACUQL5//U7xBcHwU6U9OAAAAAASUVORK5CYII="),
     *          
     *              )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Empresa creada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Empresa no encontrada"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_corto'=>'nullable|max:64|unique:empresa',
            'nombre_largo'=>'nullable|max:64|unique:empresa',
            'telefono'=>'nullable|max:64',
            'correo'=>'nullable|max:64',
            'url_logo'=>'nullable|max:64',
        ]);
        $empresa=Empresa::find($id);
        if ($empresa){
            $empresa->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la empresa con exito'],200);
        }else{
            return response()->json(['contenido'=>'no se encontro el id'],404);
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
     *     path="/api/empresa/{id}",
     *     summary="Eliminar un empresa",
     *     tags={"Empresas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la empresa",
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
        $empresa=Empresa::find($id);
        if ($empresa){
            $empresa->delete();
            return response()->json(['contenido'=>'se elimino con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la empresa'],404);
        }
    }


   
}
