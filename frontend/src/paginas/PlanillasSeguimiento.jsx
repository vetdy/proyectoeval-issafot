import { useEffect, useState, useRef, Fragment } from "react";
import { Tabla } from "../componentes/tablas";
import { IconoCargando } from "../componentes/iconos";
import { Error } from "../componentes/general";
import {
    obtenerPlanillasSeguimientoEmpresa,
    obtenerPlanillasEvaluacionEmpresa,
    obtenerItemsPlanillaSeguimiento,
    obtenerItemsPlanillaEvaluacion,
} from "../servicios/api";
import { tiempo } from "../utils";

const Planillas = ({ datos, tipo }) => {
    const titulos = ["ID", "Fecha", "Hora", "Concluido", "Detalle"];
    const [mostrar, setMostrar] = useState(datos.map((d) => false));
    const [items, setItems] = useState(datos.map((d) => null));

    if (tipo === "evaluacion") {
        titulos.push("Nota");
    }

    const endpoints = {
        seguimiento: obtenerItemsPlanillaSeguimiento,
        evaluacion: obtenerItemsPlanillaEvaluacion,
    };

    const mostrarDetalle = (idx) => {
        const nuevoMostrar = [...mostrar];
        nuevoMostrar[idx] = !nuevoMostrar[idx];
        actualizarItem(idx);
        setMostrar(nuevoMostrar);
    };

    const actualizarItem = async (fila) => {
        if (items[fila] === null) {
            const nuevoItems = [...items];
            const consultaItems = await endpoints[tipo](datos[fila].id);
            if (consultaItems.status === 200) {
                if (tipo === "seguimiento") {
                    nuevoItems[fila] =
                        consultaItems.message.item_planilla.filter(
                            (i) => i.creada === "0"
                        );
                }
                if (tipo === "evaluacion") {
                    nuevoItems[fila] = consultaItems.message.tarea;
                }
            }
            if (consultaItems.status === 404) {
                nuevoItems[fila] = [];
            }
            setItems(nuevoItems);
        }
    };

    return (
        <Tabla key={`tabla-planilla-${tipo}`} datos={titulos}>
            {datos.map((entrada, index) => {
                return (
                    <Fragment key={`fila-compuesta-${tipo}-${index}`}>
                        <tr key={`fila-compuesta-${tipo}-${index}-1`}>
                            <td>{entrada.titulo}</td>

                            <td>
                                {tiempo.normalizarFecha(entrada.fecha_revision)}
                            </td>

                            <td>
                                {tiempo.normalizarHora(entrada.hora_revision)}
                            </td>

                            <td>{entrada.concluido ? "Si" : "No"}</td>

                            <td>
                                {entrada.concluido ? (
                                    <button
                                        key={`mostrar-detalle-${tipo}-fila-${index}`}
                                        className="btn btn-eva-info"
                                        onClick={() => mostrarDetalle(index)}
                                    >
                                        Detalle
                                    </button>
                                ) : (
                                    "No disponible"
                                )}
                            </td>
                            {tipo === "evaluacion" && (
                                <td>
                                    {entrada.concluido ? entrada.nota : "-"}
                                </td>
                            )}
                        </tr>

                        <tr
                            key={`fila-compuesta-${tipo}-${index}-2`}
                            className={`${mostrar[index] ? "" : "d-none"}`}
                        >
                            <td
                                colSpan={tipo === "seguimiento" ? "5" : "6"}
                                style={{ boxShadow: "none" }}
                                className="bg-eva-info"
                            >
                                {items[index] && items[index].length ? (
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-4 fw-bold">
                                                Tareas
                                            </div>
                                            <div
                                                className={`${
                                                    tipo === "seguimiento"
                                                        ? "col-8"
                                                        : "col-7"
                                                } fw-bold`}
                                            >
                                                Observaciones
                                            </div>
                                            {tipo === "evaluacion" && (
                                                <div className="col-1 fw-bold">
                                                    Nota
                                                </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <ul className="m-0 list-group">
                                                {items[index].map((i, idx) => {
                                                    return (
                                                        <li
                                                            className="list-item"
                                                            key={`${tipo}-fila-${index}-item-${idx}`}
                                                        >
                                                            <div className="container-fluid">
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        {
                                                                            i.titulo
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        className={`${
                                                                            tipo ===
                                                                            "seguimiento"
                                                                                ? "col-8"
                                                                                : "col-7"
                                                                        } `}
                                                                    >
                                                                        {
                                                                            i.observacion
                                                                        }
                                                                    </div>
                                                                    {tipo ===
                                                                        "evaluacion" && (
                                                                        <div className="col-1">
                                                                            {
                                                                                i.nota
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <p>
                                        {!items[index]
                                            ? "Cargando..."
                                            : "No hay datos."}
                                    </p>
                                )}
                            </td>
                        </tr>
                    </Fragment>
                );
            })}
        </Tabla>
    );
};

const PlanillasSeguimiento = () => {
    const [datosSeguimiento, setDatosSeguimiento] = useState(null);
    const [datosEvaluacion, setDatosEvaluacion] = useState(null);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [hayPlanillas, setHayPlanillas] = useState(true);
    const consultar = useRef(true);

    const [empresa, setEmpresa] = useState(1);

    const reset = () => {
        setDatosSeguimiento(null);
        setError(false);
        setCargando(true);
        setHayPlanillas(true);
        consultar.current = true;
    };

    useEffect(() => {
        reset();

        const planilla = async () => {
            const consultas = [
                obtenerPlanillasSeguimientoEmpresa(empresa),
                obtenerPlanillasEvaluacionEmpresa(empresa),
            ];

            const res = await Promise.all(consultas);

            if (res.filter((r) => r.status === 200).length === 2) {
                setDatosSeguimiento(res[0].message.planilla_seguimiento);
                setDatosEvaluacion(res[1].message.evaluacion_empresa[0]);
            }

            if (res.filter((r) => r.status === 404).length) {
                setHayPlanillas(false);
            }

            if (
                res.filter((r) => r.status !== 200 && r.status !== 404).length
            ) {
                setError(true);
            }
            setCargando(false);
        };
        if (consultar.current) {
            consultar.current = false;
            planilla();
        }
    }, [empresa]);

    if (cargando) {
        return (
            <div className="container-fluid">
                <div className="row align-items-center">
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
                    <h2 className="my-2 text-center fw-bold">
                        Planillas de Seguimiento y Evaluación
                    </h2>
                </div>
            </div>

            <div className="row">
                {hayPlanillas && (
                    <div className="col-12 d-flex justify-content-between">
                        <div>
                            <h5 className="fw-bold">
                                Proyecto:{" "}
                                <span className="fw-normal">
                                    Proyecto de creación de ambientes
                                </span>
                            </h5>
                        </div>
                        <div>
                            <h5 className="fw-bold">
                                Consultor:{" "}
                                <span className="fw-normal">Mateo Corina</span>
                            </h5>
                        </div>
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col-12">
                    <h6>Seguimiento</h6>
                    {!hayPlanillas && <p>No existen Planillas</p>}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {hayPlanillas && (
                        <Planillas
                            datos={datosSeguimiento}
                            tipo={"seguimiento"}
                        />
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h6>Evaluación</h6>
                    {!hayPlanillas && <p>No existen Planillas</p>}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {hayPlanillas && (
                        <Planillas
                            datos={datosEvaluacion}
                            tipo={"evaluacion"}
                        />
                    )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col g-0">
                    <label htmlFor="idemp" className="py-2">
                        Empresa
                    </label>
                    <select
                        name="idemp"
                        id="idemp"
                        defaultValue={empresa}
                        onChange={(ev) => {
                            setEmpresa(ev.target.value);
                        }}
                    >
                        <option value="1">techoSol</option>
                        <option value="2">ISSA Soft</option>
                        <option value="3">Robo Soft</option>
                        <option value="4">HeyMoney</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PlanillasSeguimiento;
