
import { useState } from "react";
import logoDefecto from "/logo.png"
import { Input, Formulario } from "../componentes/formularios";
import { validador as validar } from "../utils";
import { base64, cadenaValoresJSON } from "../utils/conversor";
import { registrarEmpresa } from "../servicios/api";
import { Modal } from "../componentes/modales";

function RegistroEmpresa(){
    const [campos, setCampos] = useState({
        nombre_corto: "",
        nombre_largo: "",
        telefono: "",
        correo: "",
    });
    const [logoEmpresa, setLogoEmpresa] = useState(undefined);
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [contenidoModal, setContenidoModal] = useState("");

    const formatosValidosImagen = ["image/png", "image/jpeg", "image/jpg"];
    const pesoMaximoImagen = 1048576;

    function cerrarModal(){
        setContenidoModal("");
        setVerModal(false);
    }

    const actualizarCampo = (ev) =>{
        const { name, value } = ev.target;
        setCampos(c => ({...c, [name]:value}));

        const error = obtenerErrores(name, value);
        setErrores(e => ({...e, [name]: error}));
    }

    const obtenerErrores = (campo, valor) => {
        const validadores = {
            nombre_corto: (v) => validar.nombreEmpresa(v, 3, 12),
            nombre_largo: (v) => validar.nombreEmpresa(v, 3, 36),
            telefono: validar.telefonoEmpresa,
            correo: validar.correoEmpresa,
        };

        return validadores[campo](valor);
    }

    const errorImagen = (imagen) => {
        return validar.imagenEmpresa(
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
        setEnviando(true);

        const nuevosCampos = truncarCampos();
        setCampos(nuevosCampos);

        const nuevosErrores = camposInvalidos(nuevosCampos);
        setErrores(nuevosErrores);

        if(! Object.values(nuevosErrores).every(e => e === "") ){
            console.log("Hay errores");  //<======= MOSTRAR MSG ERROR
            setEnviando(false);
            setContenidoModal("Llena todos los campos.");
            setVerModal(true);
            return;
        }
        
        const id_rep = "8";   //<========= Debe cambiar cuando hayan usuarios
        const imagenBase64 = await base64(logoEmpresa);
        const datos = {
            nombre_corto: nuevosCampos.nombre_corto,
            nombre_largo: nuevosCampos.nombre_largo,
            telefono: nuevosCampos.telefono,
            correo: nuevosCampos.correo,
            id_usuario: id_rep,
            imagen: imagenBase64,
        }
        //console.log(datos);
        const respuesta = await registrarEmpresa(datos);
        setEnviando(false);

        const mensajeModal = cadenaValoresJSON(respuesta.message);
        //console.log("DESDE REGISTRO",mensajeModal);
        //console.log(respuesta.message);

        setContenidoModal( mensajeModal );
        setVerModal(true);
        console.log(respuesta);
    }

    return(
        <>
        {verModal &&
            <Modal mostrar={verModal} cerrar={cerrarModal}>
                {contenidoModal}
            </Modal>
        }
        <Formulario tituloFormulario="Registro de Empresa" nombreBoton="Enviar"
            encType="multipart/form-data" onSubmit={enviarRegistro}
            enviando={enviando}
        >
            <div className="row m-auto">
                <div className="col-md-6 py-2 d-flex flex-column">
                    <Input name="nombre_corto" placeholder="Nombre Corto"
                        type="text"
                        value={campos.nombre_corto}
                        error={errores.hasOwnProperty("nombre_corto") && errores.nombre_corto}
                        maxLength={64}
                        onChange={actualizarCampo}
                    ></Input>

                    <Input name="nombre_largo" placeholder="Nombre Largo"
                        type="text"
                        value={campos.nombre_largo}
                        error={errores.hasOwnProperty("nombre_largo") && errores.nombre_largo}
                        maxLength={64}
                        onChange={actualizarCampo}
                    ></Input>

                    <Input name="telefono" placeholder="Teléfono" 
                        type="number"
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
        </>

    );
}

export default RegistroEmpresa