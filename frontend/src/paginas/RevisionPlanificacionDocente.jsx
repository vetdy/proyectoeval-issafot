import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IconoCargando } from "../componentes/iconos";
import { conversor } from "../utils";
import { Tabla } from "../componentes/tablas";
import { obtenerPlanificacionEmpresa } from "../servicios/api";
import { Error } from "../componentes/general";
import { Modal } from "../componentes/modales";

const RevisionPlanificacionDocente = () => {
    const loc = useLocation();
    const hist = useNavigate();
    const consulta = useRef(true);
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const proyectoEmpresa = loc.state;

    console.log(proyectoEmpresa);

    useEffect(() => {
        const atras = () => {
            hist("/evaluaciones/planes-empresa");
        };

        const solicitud = async () => {
            const consultaPlan = await obtenerPlanificacionEmpresa(
                proyectoEmpresa.id_proyecto_empresa
            );

            if (consultaPlan.status === 200) {
                setDatos(
                    conversor.recuperarPlanEmpresa(
                        consultaPlan.message.planifiaciones_ob
                    )
                );
            } else {
                setError(true);
            }
            setCargando(false);
            console.log(consultaPlan);
        };

        if (!proyectoEmpresa) {
            atras();
        }

        if (consulta.current) {
            consulta.current = false;
            solicitud();
        }
    }, []);

    if (cargando) {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <IconoCargando />
                </div>
            </div>
        );
    }

    if (error) {
        return <Error />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Revisión de Planificación</h2>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Nombre de la Empresa:{" "}
                        <span className="fw-normal">
                            {proyectoEmpresa.nombre_empresa}
                        </span>
                    </h6>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Proyecto:{" "}
                        <span className="fw-normal">
                            {proyectoEmpresa.nombre_proyecto || "Proyecto de Creación de aulas"}
                        </span>
                    </h6>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">
                        Estado:{" "}
                        <span className="fw-normal text-capitalize">
                            {proyectoEmpresa.estado}
                        </span>
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
                    >
                        {datos.map((d, i) => {
                            return (
                                <tr key={`hito-${i}`}>
                                    <td>{d.titulo}</td>
                                    <td>
                                        <ol className="list-group-numbered p-0 m-0">
                                            {d.tarea.map((t, it) => {
                                                return (
                                                    <li
                                                        className="list-group-item border-0 mb-1"
                                                        key={`hito-${i}-tarea${it}`}
                                                    >
                                                        {t}
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </td>
                                    <td>{d.fecha_inicio}</td>
                                    <td>{d.fecha_fin}</td>
                                </tr>
                            );
                        })}
                    </Tabla>
                </div>
                <div className="col-12">
                    <h6 className="fw-bold">Observaciones</h6>
                </div>
                <div className="col-12">
                    <textarea
                        name=""
                        id=""
                        className="w-100"
                        disabled={proyectoEmpresa.estado === "aceptado"}
                    ></textarea>
                </div>
                <div className="col-12 d-flex gap-2">
                    {proyectoEmpresa.estado !== "aceptado" && (
                        <>
                            <button className="btn btn-eva-secondary">Aceptar</button>
                            <button className="btn btn-eva-secondary">Rechazar</button>
                        </>
                    )}
                    {proyectoEmpresa.estado === "aceptado" && (
                        <button className="btn btn-eva-secondary">Habilitar Edición</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevisionPlanificacionDocente;
