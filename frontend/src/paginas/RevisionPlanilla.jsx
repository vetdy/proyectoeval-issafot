import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Tabla } from "../componentes/tablas";
import {
    obtenerItemsPlanillaSeguimiento,
    obtenerItemsPlanillaEvaluacion,
    obtenerAsistenciaPlanillaSeguimiento,
    obtenerAsistenciaPlanillaEvaluacion,
    agregarItemPlanillaSeguimiento,
    agregarItemPlanillaEvaluacion,
    actualizarItemPlanillaSeguimiento,
    actualizarItemPlanillaEvaluacion,
    actualizarPlanillaSeguimiento,
    actualizarPlanillaEvaluacion,
    actualizarAsistenciaSeguimiento,
    actualizarAsistenciaEvaluacion,
} from "../servicios/api";
import { IconoCargando } from "../componentes/iconos";
import { useNavigate } from "react-router-dom";
import { Modal } from "../componentes/modales";
import { Error } from "../componentes/general";

const calcNota = (notas = []) => {
    let sum = 0;
    notas.forEach(n => {
        if( typeof n === "string" ){
            sum = sum + parseInt(n);
        }
        else{
            sum = sum + n;
        }
    });
    return Math.round(sum / notas.length);
}

const Planilla = ({ datos, planilla, asistencia, actualizar, retornar }) => {
    const titulos = ["#", "Tarea", "Observacion"];

    const consultas = {
        seguimiento: {
            agregar: agregarItemPlanillaSeguimiento,
            actualizar: actualizarPlanillaSeguimiento,
            actualizarItem: actualizarItemPlanillaSeguimiento,
            actualizarAsistencia: actualizarAsistenciaSeguimiento,
        },
        evaluacion: {
            agregar: agregarItemPlanillaEvaluacion,
            actualizar: actualizarPlanillaEvaluacion,
            actualizarItem: actualizarItemPlanillaEvaluacion,
            actualizarAsistencia: actualizarAsistenciaEvaluacion,
        },
    };

    if (datos.tipo === "evaluacion") {
        titulos.push("Nota");
    }

    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        tipo: "",
        estilo: "",
        aceptar: null,
        cancelar: null,
    });
    const [obs, setObs] = useState(planilla.map((p) => p.observacion));
    const [asistencias, setAsistencias] = useState(
        asistencia.map((a) => a.presente)
    );
    const [notas, setNotas] = useState(
        datos.tipo === "evaluacion" ? planilla.map((p) => p.nota) : []
    );
    const [nombreNuevaTarea, setNombreNuevaTarea] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [agregarTarea, setAgregarTarea] = useState(false);

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

    const abrirModal = (texto, tipo, fn) => {
        const nuevoModal = {
            mostrar: true,
            texto: texto,
            tipo: tipo,
            estilo: "normal",
            aceptar: cerrarModal,
            cancelar: null,
        };
        if (tipo === "confirmar") {
            nuevoModal.aceptar = fn;
            nuevoModal.cancelar = cerrarModal;
        }
        setModal(nuevoModal);
    };

    const actualizarObs = (ev, idx) => {
        const nuevaObs = [...obs];
        nuevaObs[idx] = ev.target.value;
        setObs(nuevaObs);
    };

    const actualizarAsistencia = async (ev, idx) => {
        const nuevasAsistencias = [...asistencias];
        nuevasAsistencias[idx] = !nuevasAsistencias[idx];
        setAsistencias(nuevasAsistencias);
    };

    const actualizarNotas = (ev, idx) => {
        const nuevasNotas = [...notas];
        nuevasNotas[idx] = ev.target.value;
        if (ev.target.value < 0) {
            nuevasNotas[idx] = 0;
        }
        if (ev.target.value > 100) {
            nuevasNotas[idx] = 100;
        }
        setNotas(nuevasNotas);
    };

    const crearTarea = async () => {
        if (nombreNuevaTarea && nombreNuevaTarea.trim()) {
            if (planilla.filter((p) => p.titulo === nombreNuevaTarea).length) {
                abrirModal(`La tarea ${nombreNuevaTarea} ya existe`, "simple");
                return;
            }
            setEnviando(true);
            const nuevoItem = { titulo: nombreNuevaTarea };
            if (datos.tipo === "seguimiento") {
                nuevoItem["id_planilla_seguimiento"] = datos.idSeguimiento;
            } else {
                nuevoItem["id_evaluacion"] = datos.idSeguimiento;
            }

            const consulta = await consultas[datos.tipo].agregar(nuevoItem);
            if (consulta.status === 200) {
                await actualizar();
                abrirModal(
                    `Se agrego la tarea: ${nombreNuevaTarea}`,
                    "temporal"
                );
                setNombreNuevaTarea("");
            }
            setEnviando(false);
        }

        setAgregarTarea(false);
    };

    const crearTareaEnter = (ev) => {
        if (ev.key === "Enter") {
            crearTarea();
        }
    };

    const terminarSeguimiento = async () => {
        setEnviando(true);
        const consultasActualizacion = [];

        planilla.forEach((p, index) => {
            const observacion = p.observacion;
            const nota = p.nota;
            const nuevosDatos = {};

            if (observacion !== obs[index] && obs[index] && obs[index].trim()) {
                nuevosDatos["observacion"] = obs[index];
            }
            if (datos.tipo === "evaluacion" && nota !== notas[index]) {
                nuevosDatos["nota"] = notas[index];
            }
            if (Object.keys(nuevosDatos).length) {
                consultasActualizacion.push(
                    consultas[datos.tipo].actualizarItem(p.id, nuevosDatos)
                );
            }
        });

        asistencia.forEach((a, index) => {
            if (a.presente !== asistencias[index]) {
                consultasActualizacion.push(
                    consultas[datos.tipo].actualizarAsistencia(a.id, {
                        presente: asistencias[index],
                    })
                );
            }
        });

        const res = await Promise.all(consultasActualizacion);

        let errors = false;

        res.forEach((r) => {
            if (r.status !== 200) {
                errors = true;
                console.error(r.message);
            }
        });

        if (errors) {
            abrirModal("Ocurrio un error", "simple");
        } else {
            abrirModal(`Terminar la ${datos.tipo}?`, "confirmar", async () => {
                setEnviando(true);
                const datosEnviar = { concluido: true };

                if (datos.tipo === "evaluacion") {
                    datosEnviar["nota"] = calcNota(notas);
                }
                
                const consultaTerminar = await consultas[datos.tipo].actualizar(
                    datos.idSeguimiento,
                    datosEnviar
                );
                if (consultaTerminar.status === 200) {
                    retornar();
                } else {
                    abrirModal("Ocurrio un error", "simple");
                }
                setEnviando(false);
            });
        }
        setEnviando(false);
    };

    return (
        <div className="container-fluid">
            {enviando && (
                <div className="row">
                    <IconoCargando tipo={"linea"}></IconoCargando>
                </div>
            )}
            {modal.mostrar && (
                <Modal
                    mostrar={modal.mostrar}
                    texto={modal.texto}
                    tipo={modal.tipo}
                    estilo={modal.estilo}
                    aceptar={modal.aceptar}
                    cancelar={modal.cancelar}
                    inputHandle={modal.inputHandle}
                />
            )}
            <div className="row">
                <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold">{`${
                        datos.tipo === "evaluacion"
                            ? "Evaluación"
                            : "Seguimiento Semanal"
                    }`}</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <h3 className="fw-bold m-0">
                            Empresa:{" "}
                            <span className="fw-normal">{datos.nombre}</span>
                        </h3>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-sm-6 ">
                    <div className="container">
                        <div className="row">
                            <h3>Datos de la Planificación</h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4 className="fw-bold">
                                    Titulo:{" "}
                                    <span className="fw-normal">
                                        {datos.titulo}
                                    </span>
                                </h4>
                                <h5 className="fw-bold">
                                    Fecha:{" "}
                                    <span className="fw-normal">
                                        {datos.fecha}
                                    </span>
                                </h5>
                                <h5 className="fw-bold">
                                    Hora:{" "}
                                    <span className="fw-normal">
                                        {datos.hora}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <h3>Control de Asistencia</h3>
                    </div>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-dark">
                                <div className="d-flex justify-content-between">
                                    <h6>Integrante</h6>
                                    <h6>Presente</h6>
                                </div>
                            </div>
                        </div>
                        {asistencia.map((a, i) => {
                            return (
                                <div
                                    className="col border-bottom border-eva-info"
                                    key={`list-${a.id_usuario}`}
                                >
                                    <div className="d-flex justify-content-between align-items-center text-capitalize">
                                        {a.nombre_usuario}
                                        <input
                                            type="checkbox"
                                            name={`as-${a.id}`}
                                            defaultChecked={asistencias[i]}
                                            onChange={(ev) => {
                                                actualizarAsistencia(ev, i);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <br />
            <div className="row">
                <h3>Planilla</h3>
            </div>
            <div className="row px-2">
                <Tabla datos={titulos}>
                    {planilla.map((p, index) => {
                        return (
                            <tr key={`planilla-item-${index}`}>
                                <td
                                    className={`${
                                        p.generada ? "bg-l-gray" : ""
                                    }`}
                                >
                                    {index + 1}
                                </td>
                                <td
                                    className={`${
                                        p.generada ? "bg-l-gray" : ""
                                    }`}
                                >
                                    {p.titulo}
                                </td>
                                <td
                                    className={`${
                                        p.generada ? "bg-l-gray" : ""
                                    }`}
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name={`obs${p.titulo}`}
                                        id=""
                                        value={obs[index] || ""}
                                        onChange={(ev) => {
                                            actualizarObs(ev, index);
                                        }}
                                        disabled={agregarTarea || enviando}
                                    />
                                </td>
                                {datos.tipo === "evaluacion" && (
                                    <td
                                        style={{ maxWidth: "50px" }}
                                        className={`${
                                            p.generada ? "bg-l-gray" : ""
                                        }`}
                                    >
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={notas[index] || 0}
                                            name={`nota${p.titulo}`}
                                            onChange={(ev) => {
                                                actualizarNotas(ev, index);
                                            }}
                                            disabled={agregarTarea || enviando}
                                        />
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </Tabla>
            </div>

            <div
                className={`row mt-2 ${
                    agregarTarea ? "" : "d-none"
                } align-items-center`}
            >
                <div className="col-12 mb-1">
                    <p className="m-0 fw-bold">Nombre de la Tarea</p>
                </div>
                <div className="col-sm-7 mb-1">
                    <input
                        ref={(input) => {
                            if (input) {
                                input.focus();
                                input.scrollIntoView();
                            }
                        }}
                        className="form-control"
                        name="newTarea"
                        value={nombreNuevaTarea}
                        onChange={(ev) => {
                            setNombreNuevaTarea(ev.target.value);
                        }}
                        onKeyDown={crearTareaEnter}
                        maxLength={64}
                        disabled={enviando}
                    />
                </div>
                <div className="col d-flex mb-1 gap-2">
                    <button
                        className="btn btn-eva-secondary"
                        onClick={crearTarea}
                        disabled={enviando}
                    >
                        Agregar
                    </button>
                    <button
                        className="btn btn-eva-secondary"
                        onClick={() => {
                            setAgregarTarea(false);
                            setNombreNuevaTarea("");
                        }}
                        disabled={enviando}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            <div className="row my-2 g-0">
                <div className="col">
                    <div className="row g-1">
                        <div className="col-sm-3">
                            <button
                                className="btn btn-eva-info w-100"
                                onClick={() => {
                                    setAgregarTarea(true);
                                }}
                                disabled={agregarTarea || enviando}
                            >
                                Agregar Tarea
                            </button>
                        </div>
                        {/* <div className="col-md-2">
                            <button
                                className="btn btn-eva-info w-100"
                                disabled={agregarTarea || enviando}
                            >
                                Eliminar Tarea
                            </button>
                        </div> */}
                        {/* <div className="col-md-6"></div> */}
                        <div className="col-sm-3 mb-4">
                            <button
                                className="btn btn-eva-secondary w-100"
                                onClick={terminarSeguimiento}
                                disabled={agregarTarea || enviando}
                            >
                                Terminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RevisionPlanilla = () => {
    const location = useLocation();
    const history = useNavigate();
    const datos = location.state;

    const [planilla, setPlanilla] = useState([]);
    const [asistencia, setAsistencia] = useState([]);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    const consulta = useRef(true);

    const consultas = {
        seguimiento: {
            items: obtenerItemsPlanillaSeguimiento,
            asistencia: obtenerAsistenciaPlanillaSeguimiento,
        },
        evaluacion: {
            items: obtenerItemsPlanillaEvaluacion,
            asistencia: obtenerAsistenciaPlanillaEvaluacion,
        },
    };

    const irAPlanillas = () => {
        history("/planillas");
    };

    const actualizarItems = async () => {
        const solicitud = await consultas[datos.tipo].items(
            datos.idSeguimiento
        );

        if (solicitud.status === 200) {
            if (datos.tipo === "seguimiento") {
                setPlanilla(solicitud.message.item_planilla);
            } else {
                setPlanilla(solicitud.message.tarea);
            }
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        const solicitud = async () => {
            const solicitudes = [
                consultas[datos.tipo].items(datos.idSeguimiento),
                consultas[datos.tipo].asistencia(datos.idSeguimiento),
            ];

            const res = await Promise.all(solicitudes);

            if (res.filter((r) => r.status === 200).length === 2) {
                if (datos.tipo === "seguimiento") {
                    setPlanilla(res[0].message.item_planilla);
                    setAsistencia(res[1].message.usuarios);
                } else {
                    setPlanilla(res[0].message.tarea);
                    setAsistencia(res[1].message.usuarios);
                }
            } else {
                setError(true);
            }

            setCargando(false);
        };

        if (!datos) {
            irAPlanillas();
        }

        if (consulta.current) {
            solicitud();
            consulta.current = false;
        }
    }, []);

    if (cargando) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <IconoCargando />
                </div>
            </div>
        );
    }

    if (error) {
        return <Error />;
    }

    return (
        <Planilla
            datos={datos}
            planilla={planilla}
            asistencia={asistencia}
            actualizar={actualizarItems}
            retornar={irAPlanillas}
        />
    );
};

export default RevisionPlanilla;
