import logo from "/logo.png"
import {Input, Formulario} from "@src/componentes/formularios";
import { useState } from "react";

function RegistroEmpresa(){
    const [nombreCorto, setNombreCorto] = useState("");
    const [nombreLargo, setNombreLargo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [logoEmpresa, setLogoEmpresa] = useState("");

    return(
        <Formulario tituloFormulario="Registro de Empresa" nombreBoton="Enviar">
            <div className="row m-auto">
                <div className="col-md-6 py-2 d-flex flex-column row-gap-2">
                        <Input type="text" name="nombre_corto" placeholder="Nombre Corto"></Input>
                        <Input type="text" name="nombre_largo" placeholder="Nombre Largo"></Input>
                        <Input type="text" name="telefono" placeholder="Teléfono"></Input>
                        <Input type="text" name="correo" placeholder="Correo"></Input>
                </div>

                <div className="col-md-6 p-2 d-flex flex-column align-items-center justify-content-center">
                    <img src={logo} width="120" alt="Vista previa" className="img-fluid mb-4"></img>
                    <input type="file" key="logo" name="logo" className="form-control"></input>                           
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