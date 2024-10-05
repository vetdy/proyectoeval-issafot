import logoDefecto from "/logo.png"
import { Input, Formulario } from "@src/componentes/formularios";
import { useState } from "react";
import validarEntrada from "../utils/validarEntrada";
import rutasBackend from "../config/rutasBackend";


function RegistroEmpresa(){
    const [campos, setCampos] = useState({
        nombre_corto: "",
        nombre_largo: "",
        telefono: "",
        correo: "",
    });
    const [logoEmpresa, setLogoEmpresa] = useState(undefined);
    const [errores, setErrores] = useState({});

    const formatosValidosImagen = ["image/png", "image/jpeg", "image/jpg"];
    const pesoMaximoImagen = 1048576;
   
    const actualizarCampo = (ev) =>{
        const { name, value } = ev.target;
        setCampos(c => ({...c, [name]:value}));

        const error = obtenerErrores(name, value);
        setErrores(e => ({...e, [name]: error}));
    }

    const obtenerErrores = (campo, valor) => {
        const validadores = {
            nombre_corto: validarEntrada.nombreCortoEmpresa,
            nombre_largo: validarEntrada.nombreLargoEmpresa,
            telefono: validarEntrada.telefono,
            correo: validarEntrada.correo,
        };

        return validadores[campo](valor);
    }

    const errorImagen = (imagen) => {
        return validarEntrada.imagen(
            imagen, 
            formatosValidosImagen, 
            pesoMaximoImagen
        );
    };

    const actualizarImagen = (ev) => {
        const imagen = ev.target.files[0];

        const error = errorImagen(imagen);

        setErrores(e => ({...e, logo: error}));

        setLogoEmpresa( imagen );
    };

    const truncarCampos = () =>{
        const nuevosCampos = {};

        Object.entries(campos).forEach( ([k, v]) => {
            nuevosCampos[k] = v.trim();
        });

        return nuevosCampos;
    }

    const camposInvalidos = (camposActuales) =>{
        const nuevosErrores = {}

        Object.entries(camposActuales).forEach( ([campo, valor]) => {
            const error = obtenerErrores(campo, valor);
            if ( error ){
                nuevosErrores[campo] = error;
            }
        });

        const errImagen = errorImagen(logoEmpresa);

        if( errImagen ){
            nuevosErrores.logo = errImagen;
        }

        return nuevosErrores;
    }

    const enviarRegistro = async (ev) =>{
        ev.preventDefault();

        const nuevosCampos = truncarCampos();
        setCampos(nuevosCampos);

        const nuevosErrores = camposInvalidos(nuevosCampos);
        setErrores(nuevosErrores);

        if(! Object.values(nuevosErrores).every(e => e === "") ){
            console.log("Hay errores");
            return;
        }

        let formulario = new FormData();

        Object.entries(nuevosCampos).forEach( ([campo, valor]) => {
            formulario.append(campo, valor);
        });

        formulario.append("logo", logoEmpresa);

        /* try{
            const res = await fetch(rutasBackend.registroEmpresa, {
                method: "POST",
                content: "multipart/form-data",
                mode: "no-cors",
                accept: "application/json",
                body: formulario,
            });
            console.log("Se enviaron los datos");
        }
        catch(err){
            console.log("Error Enviando datos.");
        } */
    }

    return(
        <Formulario tituloFormulario="Registro de Empresa" nombreBoton="Enviar"
            encType="multipart/form-data" onSubmit={enviarRegistro}
        >
            <div className="row m-auto">
                <div className="col-md-6 py-2 d-flex flex-column">
                    <Input name="nombre_corto" placeholder="Nombre Corto"
                        type="text"
                        value={campos.nombre_corto}
                        error={errores.hasOwnProperty("nombre_corto") && errores.nombre_corto}
                        onChange={actualizarCampo}
                    ></Input>

                    <Input name="nombre_largo" placeholder="Nombre Largo"
                        type="text"
                        value={campos.nombre_largo}
                        error={errores.hasOwnProperty("nombre_largo") && errores.nombre_largo}
                        onChange={actualizarCampo}
                    ></Input>

                    <Input name="telefono" placeholder="Teléfono" 
                        type="text"
                        value={campos.telefono}
                        error={errores.hasOwnProperty("telefono") && errores.telefono}
                        onChange={actualizarCampo}
                    ></Input>

                    <Input name="correo" placeholder="Correo"
                        type="text"
                        value={campos.correo}
                        error={errores.hasOwnProperty("correo") && errores.correo}
                        onChange={actualizarCampo}
                    ></Input>
                </div>

                <div className="col-md-6 p-2 d-flex flex-column align-items-center justify-content-center">
                    <img src={logoEmpresa === undefined ? logoDefecto : URL.createObjectURL(logoEmpresa)}
                        width="auto" height="115" alt="Vista previa"
                        max-width="100%"
                        className="mb-4 object-fit-scale"
                    ></img>
                    <Input name="logo" accept={formatosValidosImagen.join()}
                        type="file"
                        error={errores.hasOwnProperty("logo") && errores.logo}
                        onChange={actualizarImagen}
                    ></Input>
                </div>
            </div>

            <div className="row m-auto my-2">
                <div className="col-md-4">
                    <h5 className="fw-bold m-auto">Representante Legal:</h5>
                </div>
                <div className="col-md-8">
                    <h5 className="m-auto">Jose</h5>
                </div>
                <input type="hidden" name="id_representante_legal" value="Usuario"></input>
            </div>
        </Formulario>
    );
}

export default RegistroEmpresa