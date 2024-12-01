import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IconoCargando } from "../componentes/iconos";
import { conversor } from "../utils";
import { Tabla } from "../componentes/tablas";
import {
    obtenerPlanificacionEmpresa,
    obtenerEstadoPlanificacionProyectoEmpresa,
    actualizarRevisionPlanificacion,
} from "../servicios/api";
import { Error } from "../componentes/general";
import { Modal } from "../componentes/modales";
import { tiempo } from "../utils";

const RevisionPlanificacionDocente = () => {
    const loc = useLocation();
    const hist = useNavigate();
    const consulta = useRef(true);
    const [datosEstado, setDatosEstado] = useState({});
    const [datosPlan, setDatosPlan] = useState([]);
    const [datosDiaHora, setDatosDiaHora] = useState({
        dia_revision: "",
        hora_revision: "",
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [actualizando, setActualizando] = useState(false);
    const [observasiones, setObservaciones] = useState("");
    const proyectoEmpresa = loc.state;
    const estadosPlanificacion = {
        2: "En revisión",
        3: "Aceptado",
        4: "Rechazado",
    };

    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        tipo: "",
        estilo: "",
        aceptar: "",
        cancelar: "",
    });

    const irRevisionPlanificaciones = () => {
        hist("/evaluaciones/planes-empresa");
    };

    const recargarPagina = () => {
        window.location.reload();
    };

    useEffect(() => {
        const solicitud = async () => {
            const consultas = [
                obtenerEstadoPlanificacionProyectoEmpresa(
                    proyectoEmpresa.id_proyecto_empresa
                ),
                obtenerPlanificacionEmpresa(
                    proyectoEmpresa.id_proyecto_empresa
                ),
            ];

            const res = await Promise.all(consultas);

            if (res.filter((r) => r.status === 200).length !== 2) {
                setError(true);
            } else {
                setDatosEstado(res[0].message.revision_planificacion);
                setObservaciones(
                    res[0].message.revision_planificacion.observacion
                );
                setDatosPlan(
                    conversor.recuperarPlanEmpresa(
                        res[1].message.planifiaciones_ob
                    )
                );
                setDatosDiaHora({
                    dia_revision: tiempo.numeroDia(
                        res[1].message.planifiaciones_ob.dia_revision
                    ),
                    hora_revision: tiempo.normalizarHora(
                        res[1].message.planifiaciones_ob.hora_revision
                    ),
                });
            }
            setCargando(false);
        };

        if (!proyectoEmpresa) {
            irRevisionPlanificaciones();
        }

        if (consulta.current) {
            consulta.current = false;
            solicitud();
        }
    }, []);

    const abrirModal = (texto = "", tipo = "simple", funcion = null) => {
        const nuevoModal = {
            mostrar: true,
            texto: texto,
            tipo: tipo,
            estilo: "normal",
            aceptar: cerrarModal,
            cancelar: "",
        };

        if (tipo === "confirmar") {
            nuevoModal.aceptar = funcion;
            nuevoModal.cancelar = cerrarModal;
        }

        setModal(nuevoModal);
    };

    const cerrarModal = () => {
        setModal({
            mostrar: false,
            texto: "",
            tipo: "",
            estilo: "",
            aceptar: null,
            cancelar: null,
        });
    };

    const aceptarPlan = () => {
        let textoConfirmar = "Aceptar Planificación?";

        if (observasiones) {
            textoConfirmar =
                "El campo observaciones no esta vacio, Aceptar Planificación?";
        }

        abrirModal(textoConfirmar, "confirmar", () => {
            actualizarEstado(3, observasiones);
            cerrarModal();
        });
    };

    const rechazarPlan = () => {
        let textoConfirmar = "Rechazar Planificación?";

        if (!observasiones) {
            textoConfirmar =
                "No a agregado ninguna observación, rechazar de todas formas?";
        }

        abrirModal(textoConfirmar, "confirmar", () => {
            actualizarEstado(4, observasiones);
            cerrarModal();
        });
    };

    const habilitarRevision = () => {
        abrirModal("Habilitar la revisión?", "confirmar", () => {
            actualizarEstado(2);
            cerrarModal();
        });
    };

    const actualizarEstado = async (nuevoEstado, observacion = "") => {
        setActualizando(true);
        let fallo = false;

        const revPlanConsulta = await obtenerEstadoPlanificacionProyectoEmpresa(
            proyectoEmpresa.id_proyecto_empresa
        );

        if (revPlanConsulta.status !== 200) {
            fallo = true;
        }

        if (!fallo) {
            const revID = revPlanConsulta.message.revision_planificacion.id;
            const consultaActualizar = await actualizarRevisionPlanificacion(
                revID,
                nuevoEstado,
                observacion
            );

            if (consultaActualizar.status !== 200) {
                fallo = true;
            }
        }

        if (fallo) {
            abrirModal("Ocurrio un error, intenta de nuevo");
        } else {
            if (nuevoEstado === 2) {
                recargarPagina();
            } else {
                irRevisionPlanificaciones();
            }
        }

        setActualizando(false);
    };

    const actualizarObservacion = (ev) => {
        const nuevaObservacion = ev.target.value;
        setObservaciones(nuevaObservacion);
    };

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
            {modal.mostrar && (
                <Modal
                    mostrar={modal.mostrar}
                    texto={modal.texto}
                    tipo={modal.tipo}
                    estilo={modal.estilo}
                    aceptar={modal.aceptar}
                    cancelar={modal.cancelar}
                />
            )}
            {actualizando && (
                <div className="row">
                    <IconoCargando tipo="linea" />
                </div>
            )}
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Revisión de Planificación</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <h6 className="fw-bold">
                        Nombre de la Empresa
                        <span className="fw-normal d-sm-none">
                            {": "}
                            {proyectoEmpresa.nombre_empresa}
                        </span>
                    </h6>
                    <p className="d-none d-sm-block">
                        {proyectoEmpresa.nombre_empresa}
                    </p>
                </div>
                <div className="col-sm-4">
                    <h6 className="fw-bold">
                        Proyecto
                        <span className="fw-normal d-sm-none">
                            {": "}
                            {proyectoEmpresa.nombre_proyecto ||
                                "Proyecto de Creación de aulas"}
                        </span>
                    </h6>
                    <p className="d-none d-sm-block">
                        {proyectoEmpresa.nombre_proyecto ||
                            "Proyecto de Creación de aulas"}
                    </p>
                </div>
                <div className="col-sm-4">
                    <h6 className="fw-bold">
                        Estado
                        <span className="fw-normal d-sm-none">
                            {": "}
                            {
                                estadosPlanificacion[
                                    datosEstado.id_estado_planificacion
                                ]
                            }
                        </span>
                    </h6>
                    <p className="d-none d-sm-block">
                        {
                            estadosPlanificacion[
                                datosEstado.id_estado_planificacion
                            ]
                        }
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <h6 className="fw-bold">
                        Dia Revisión
                        <span className="fw-normal d-sm-none">
                            {": "}
                            {datosDiaHora.dia_revision}
                        </span>
                    </h6>
                    <p className="d-none d-sm-block">
                        {datosDiaHora.dia_revision}
                    </p>
                </div>
                <div className="col-sm-4">
                    <h6 className="fw-bold">
                        Hora Revisión
                        <span className="fw-normal d-sm-none">
                            {": "}
                            {datosDiaHora.hora_revision}
                        </span>
                    </h6>
                    <p className="d-none d-sm-block">
                        {datosDiaHora.hora_revision}
                    </p>
                </div>
            </div>
            <div className="row">
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
                        {datosPlan.map((d, i) => {
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
            </div>
            <div className="row">
                <div className="col-12">
                    <h6 className="fw-bold">Observaciones</h6>
                </div>
                <div className="col-12">
                    <textarea
                        name="obs"
                        id="obs"
                        className="w-100"
                        value={observasiones}
                        onChange={actualizarObservacion}
                        disabled={
                            datosEstado.id_estado_planificacion === 3 ||
                            datosEstado.id_estado_planificacion === 4
                        }
                    ></textarea>
                </div>
                <div className="col-12 d-flex gap-2">
                    {datosEstado.id_estado_planificacion === 2 && (
                        <>
                            <button
                                className="btn btn-eva-secondary"
                                onClick={aceptarPlan}
                                disabled={actualizando}
                            >
                                Aceptar
                            </button>
                            <button
                                className="btn btn-eva-secondary"
                                onClick={rechazarPlan}
                                disabled={actualizando}
                            >
                                Rechazar
                            </button>
                        </>
                    )}
                    {(datosEstado.id_estado_planificacion === 3 ||
                        datosEstado.id_estado_planificacion === 4) && (
                        <button
                            className="btn btn-eva-secondary"
                            onClick={habilitarRevision}
                            disabled={actualizando || datosEstado.planillas_creada}
                        >
                            Habilitar Revisión
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevisionPlanificacionDocente;
