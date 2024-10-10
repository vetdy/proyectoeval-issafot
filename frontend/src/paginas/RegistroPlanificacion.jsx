
import { useState } from "react";
import { Input, Formulario } from "../componentes/formularios";
import { validador as validar } from "../utils";

function RegistroPlanificacion(){
    const [campos, setCampos] = useState({
        sprint1: { tarea: "", fechaInicio: "", fechaFin: "" },
        sprint2: { tarea: "", fechaInicio: "", fechaFin: "" },
        sprint3: { tarea: "", fechaInicio: "", fechaFin: "" },
    });
    const [errores, setErrores] = useState({});

    const actualizarCampo = (ev, sprint) =>{
        const { name, value } = ev.target;
        setCampos(c => ({
            ...c,
            [sprint]: { ...c[sprint], [name]: value }
        }));

        const error = obtenerErrores(name, value);
        setErrores(e => ({...e, [sprint]: {...e[sprint], [name]: error}}));
    }

    const obtenerErrores = (campo, valor) => {
        const validadores = {
            tarea: (v) => validar.texto(v, 3, 100),
            fechaInicio: validar.fecha,
            fechaFin: validar.fecha,
        };
        return validadores[campo](valor);
    }

    const truncarCampos = () =>{
        const nuevosCampos = {};
        Object.entries(campos).forEach( ([sprint, datos]) => {
            nuevosCampos[sprint] = {};
            Object.entries(datos).forEach( ([k, v]) => {
                nuevosCampos[sprint][k] = v.trim();
            });
        });
        return nuevosCampos;
    }

    const camposInvalidos = (camposActuales) =>{
        const nuevosErrores = {};
        Object.entries(camposActuales).forEach( ([sprint, datos]) => {
            nuevosErrores[sprint] = {};
            Object.entries(datos).forEach( ([campo, valor]) => {
                const error = obtenerErrores(campo, valor);
                if ( error ){
                    nuevosErrores[sprint][campo] = error;
                }
            });
        });
        return nuevosErrores;
    }

    const enviarRegistro = (ev) =>{
        ev.preventDefault();

        const nuevosCampos = truncarCampos();
        setCampos(nuevosCampos);

        const nuevosErrores = camposInvalidos(nuevosCampos);
        setErrores(nuevosErrores);

        if(! Object.values(nuevosErrores).every(e => Object.values(e).every(err => err === "")) ){
            console.log("Hay errores");  //<======= MOSTRAR MSG ERROR
            return;
        }

        console.log("Datos enviados", nuevosCampos);
    }

    return(
        <Formulario tituloFormulario="Registro de Planificación de un Ewuipo" nombreBoton="Guardar?"
            onSubmit={enviarRegistro}
        >
            {[1, 2, 3].map(num => (
                <div className="row m-auto py-2" key={num}>
                    <div className="col-md-3">
                        <h6>Sprint {num}</h6>
                    </div>
                    <div className="col-md-3">
                        <Input name="tarea" placeholder="Hist/Tarea"
                            type="text"
                            value={campos[`sprint${num}`].tarea}
                            error={errores[`sprint${num}`]?.tarea}
                            onChange={(ev) => actualizarCampo(ev, `sprint${num}`)}
                        />
                    </div>
                    <div className="col-md-3">
                        <Input name="fechaInicio" placeholder="Fecha de Inicio"
                            type="date"
                            value={campos[`sprint${num}`].fechaInicio}
                            error={errores[`sprint${num}`]?.fechaInicio}
                            onChange={(ev) => actualizarCampo(ev, `sprint${num}`)}
                        />
                    </div>
                    <div className="col-md-3">
                        <Input name="fechaFin" placeholder="Fecha de Fin"
                            type="date"
                            value={campos[`sprint${num}`].fechaFin}
                            error={errores[`sprint${num}`]?.fechaFin}
                            onChange={(ev) => actualizarCampo(ev, `sprint${num}`)}
                        />
                    </div>
                </div>
            ))}
        </Formulario>
    );
}

export default RegistroPlanificacion;
