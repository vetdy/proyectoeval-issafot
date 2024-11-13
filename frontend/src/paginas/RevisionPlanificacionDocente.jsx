import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IconoCargando } from "../componentes/iconos";
import { conversor } from "../utils";
import { Tabla } from "../componentes/tablas";

const RevisionPlanificacionDocente = () => {
    const loc = useLocation();
    const hist = useNavigate();
    const consulta = useRef(true);
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const proyecto_empresa = loc.state;

    console.log(proyecto_empresa);

    useEffect(() => {
        const atras = () => { hist("/evaluaciones/planes-empresa") }

        const solicitud = async () => {

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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Revisión de Planificaciones</h2>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Nombre: <span className="fw-normal">{datos.empresa}</span>
                    </h6>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Proyecto:{" "}
                        <span className="fw-normal">{datos.proyecto}</span>
                    </h6>
                </div>
                <div className="col-12">
                    <Tabla
                        hover={false}
                        px0={true}
                        datos={[
                            "Hito",
                            "Objetivos",
                            "Fecha Inicio",
                            "Fecha Fin",
                            "% Cobro",
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