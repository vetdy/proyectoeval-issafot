import logoDefecto from "/logo.png"
import { Input, Formulario } from "@src/componentes/formularios";
import { useState } from "react";
import validarEntrada from "../utils/validarEntrada";


function RegistroEmpresa(){
    const [campos, setCampos] = useState({
        nombre_corto: "",
        nombre_largo: "",
        telefono: "",
        correo: "",
    });
    const [logoEmpresa, setLogoEmpresa] = useState(logoDefecto);
    const [errores, setErrores] = useState({});

    const formatosPermitidos = ["image/png", "image/jpeg", "image/jpg"];
   
    const actualizarCampo = (ev) =>{
        const { name, value } = ev.target;

        setCampos(c => ({...c, [name]:value}));

        validarCampos(name, value);
    }

    const validarCampos = (campo, valor) => {
        let error = "";

        if(campo === "nombre_corto"){
            error = validarEntrada.nombreCortoEmpresa(valor);
        }
        if(campo === "nombre_largo"){
            error = validarEntrada.nombreLargoEmpresa(valor);
        }
        if(campo === "telefono"){
            error = validarEntrada.telefono(valor);
        }
        if(campo === "correo"){
            error = validarEntrada.correo(valor);
        }

        setErrores(e => ({...e, [campo]: error}));
    }

    const validarImagen = (ev) => {
        const imagen = ev.target.files[0];

        const error = validarEntrada.imagen(imagen, formatosPermitidos, 1048576);

        setErrores(e => ({...e, logo: error}));

        if (error === ""){
            setLogoEmpresa( URL.createObjectURL(imagen) );
        }
        else{
            setLogoEmpresa( logoDefecto );
        }
    };

    return(
        <Formulario tituloFormulario="Registro de Empresa" nombreBoton="Enviar">
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
                    <img src={logoEmpresa} 
                        width="auto" height="115" alt="Vista previa"
                        max-width="100%"
                        className="mb-4 object-fit-scale"
                    ></img>
                    <Input name="logo" accept={formatosPermitidos.join()}
                        type="file"
                        error={errores.hasOwnProperty("logo") && errores.logo}
                        onChange={validarImagen}
                    >

                    </Input>
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