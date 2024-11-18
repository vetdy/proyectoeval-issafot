import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IconoCargando } from "../componentes/iconos";
import { conversor } from "../utils";
import { Tabla } from "../componentes/tablas";
import { obtenerPlanificacionEmpresa } from "../servicios/api"
import { Error } from "../componentes/general";

const RevisionPlanificacionDocente = () => {
    const loc = useLocation();
    const hist = useNavigate();
    const consulta = useRef(true);
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);
    const proyectoEmpresa = loc.state;

    console.log(proyectoEmpresa);

    useEffect(() => {
        const atras = () => { hist("/evaluaciones/planes-empresa") }

        const solicitud = async () => {
            const consultaPlan = await obtenerPlanificacionEmpresa(proyectoEmpresa.id_proyecto_empresa);
            console.log(consultaPlan);
        }
        if( !proyectoEmpresa ){
            atras();
        }

        if(consulta.current){
            consulta.current = false;
            solicitud();
        }
    },[]);

    if (cargando) {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <IconoCargando />
                </div>
            </div>
        );
    }

    if( error ){
        return <Error />
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Revisión de Planificación</h2>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Nombre: <span className="fw-normal">{proyectoEmpresa.nombre_empresa}</span>
                    </h6>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Proyecto:{" "}
                        <span className="fw-normal">{proyectoEmpresa.nombre_proyecto}</span>
                    </h6>
                </div>
                <div className="col-12">
                    <Tabla
                        hover={false}
                        px0={true}
                        datos={[
                            "Hito",
                            "Entregables",
                            "Fecha Inicio",
                            "Fecha Fin",
                        ]}
                    ></Tabla>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">Observaciones</h6>
                </div>
                <div className="col-12">
                    <textarea
                        name=""
                        id=""
                        className="w-100 user-select-none"
                    ></textarea>
                </div>
                <div className="col-12 d-flex gap-2">
                    <button
                        className="btn btn-eva-secondary"
                    >
                        Aceptar
                    </button>
                    <button
                        className="btn btn-eva-secondary"
                    >
                        Rechazar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RevisionPlanificacionDocente;