<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class EmpresaService
{
    /**
     * Obtiene la extensión de la imagen según su tipo.
     *
     * @param string $type
     * @return string
     */
    private function getImageExtension($type)
    {
        switch ($type) {
            case 'jpeg':
            case 'jpg':
                return '.jpg';
            case 'png':
                return '.png';
            case 'gif':
                return '.gif';
            case 'bmp':
                return '.bmp';
            default:
                return '.jpg'; // Valor predeterminado
        }
    }

    public function storeImage($base64, $name, $url)
    {
        preg_match('/^data:image\/(?<type>.+);base64,/', $base64, $matches);

        $imageType = $matches['type']; // tipo de imagen, ej: jpeg
        $extension = $this->getImageExtension($imageType); // Obtener la extensión del archivo
        if ($url) {
            Storage::delete($url);
        }
        // Extraer solo los datos Base64
        $base64Image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $imageData = base64_decode($base64Image); // Decodificar la cadena Base64
        $imageName = $name . $extension; // usar la extensión correcta

        $ruta = '/storage/imagenes_empresa/' . $imageName;

        $rutaPublica = Storage::put($ruta, $imageData);
        return $ruta;
    }
}
