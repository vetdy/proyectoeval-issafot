import { backend as rutas } from "../rutas"
const URL_BACKEND = import.meta.env.VITE_SERVIDOR_BACKEND_URL;

export const solicitud = async (url = URL_BACKEND, metodo = "get", datosJSON) => {
    try{
        const datos = {};

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        datos.method = metodo;
        datos.headers = headers;

        if(datosJSON){
            datos.body = JSON.stringify(datosJSON);
        }

        const respuestaBackend = await fetch(url, datos);

        if(! respuestaBackend.ok ){
            console.error(`Error en backend: ${respuestaBackend.status}: ${respuestaBackend.statusText}`);
            return {
                status: respuestaBackend.status,
                message: respuestaBackend.statusText,
            };
        }

        const resultado = await respuestaBackend.json();
        return {
            status: respuestaBackend.status,
            message: resultado.contenido,
        };
    }
    catch(error){
        if(error instanceof SyntaxError){
            console.error(`Los datos json no son validos: ${datosJSON}`);
            return {
                status: 422,
                message: "Los datos son invalidos.",
            }
        }
        else if(error.message.includes("Failed to fetch")){
            console.error(`No se pudo conectar con el servidor backend: ${URL_BACKEND}`);
            return {
                status: 424,
                message: "El servicio no se encuentra disponible en este momento.",
            }
        }
        else{
            console.error("Error inesperado:", error);
            return {
                status: 500,
                message: "La solicitud no se puede completar en este momento.",
            }
        }
    }
}

export const registrarEmpresa = async (datosFormulario={}) => {
    const respuesta = await solicitud(rutas.REGISTRO_EMPRESA, "POST", datosFormulario);
    return respuesta;
}

export default solicitud