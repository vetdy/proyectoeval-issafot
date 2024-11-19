import { useEffect, useState, useRef, Fragment } from "react";
import { Tabla } from "../componentes/tablas";
import { IconoCargando } from "../componentes/iconos";
import { Error } from "../componentes/general";
import {
    obtenerPlanillasSeguimientoEmpresa,
    obtenerPlanillasEvaluacionEmpresa,
    obtenerItemsPlanillaSeguimiento,
    obtenerItemsPlanillaEvaluacion
} from "../servicios/api";
import { tiempo } from "../utils";

const Planillas = ({ datos, tipo }) => {
    const titulos = ["ID", "Fecha", "Hora", "Concluido", "Detalle"];
    const [mostrar, setMostrar] = useState(datos.map((d) => false));
    const [items, setItems] = useState(datos.map((d) => null));

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
            console.log(datos[fila]);
            const consultaItems = await endpoints[tipo](datos[fila].id);
            if (consultaItems.status === 200) {
                if(tipo === "seguimiento"){
                    nuevoItems[fila] = consultaItems.message.item_planilla;
                }
                if( tipo === "evaluacion" ){
                    nuevoItems[fila] = consultaItems.message.tarea;
                }
            }
            if ( consultaItems.status === 404 ){
                nuevoItems[fila] = [];
            }
            setItems(nuevoItems);
        }
    };

    return (
        <Tabla key={`tabla-planilla-${tipo}`} datos={titulos}>
            {datos.map((entrada, index) => {
                return (
                    <Fragment key={`fila-compuesta-${index}`}>
                        <tr key={`fila-compuesta-${index}-1`}>
                            <td>{entrada.titulo}</td>

                            <td>{tiempo.normalizarFecha(entrada.fecha_revision)}</td>

                            <td>{tiempo.normalizarHora(entrada.hora_revision)}</td>

                            <td>{entrada.concluido ? "Si" : "No"}</td>

                            <td>
                                <button
                                    key={`mostrar-detalle-${tipo}-fila-${index}`}
                                    className="btn btn-eva-info"
                                    onClick={() => mostrarDetalle(index)}
                                >
                                    Detalles
                                </button>
                            </td>
                        </tr>

                        <tr
                            key={`fila-compuesta-${index}-2`}
                            className={`${mostrar[index] ? "" : "d-none"}`}
                        >
                            <td colSpan={"5"} style={{ boxShadow: "none" }}>
                                <div
                                    className="py-2 border-3 rounded-2"
                                    style={{
                                        backgroundColor: "lightgray",
                                    }}
                                >
                                    {items[index] && items[index].length ? (
                                        <ol className="m-0">
                                            {items[index].map((i, idx) => {
                                                return <li>{i.titulo}</li>;
                                            })}
                                        </ol>
                                    ) : (
                                        <p>
                                            {!items[index]
                                                ? "Cargando..."
                                                : "No hay datos."}
                                        </p>
                                    )}
                                </div>
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
                obtenerPlanillasEvaluacionEmpresa(empresa)
            ];

            const res = await Promise.all(consultas);

            if( res.filter( r => r.status === 200 ).length === 2 ){
                setDatosSeguimiento( res[0].message.planilla_seguimiento );
                setDatosEvaluacion( res[1].message.evaluacion_empresa[0] );
            }
            /* console.log(res[0].message.planilla_seguimiento);
            console.log(res[1].message.evaluacion_empresa[0]); */

            if ( res.filter(r => r.status === 404).length ) {
                setHayPlanillas(false);
            }

            if ( res.filter(r => r.status !== 200 && r.status !== 404).length ) {
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
                            <h5>
                                Proyecto:{" "}
                                <span className="fw-bold">
                                    Creación de Aulas
                                </span>
                            </h5>
                        </div>
                        <div>
                            <h5>
                                Consultor:{" "}
                                <span className="fw-bold">Marco</span>
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
                        <Planillas datos={datosSeguimiento} tipo={"seguimiento"} />
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
                        <Planillas datos={datosEvaluacion} tipo={"evaluacion"} />
                    )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col g-0">
                    <label htmlFor="idemp" className="px-2">
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
