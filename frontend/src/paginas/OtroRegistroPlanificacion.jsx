import { Tabla } from "../componentes/tablas";
import { BotonControl } from "../componentes/botones";
import { useState, useRef, useEffect } from "react";
import { TituloRegistros } from "../componentes/titulos";

const actualizarLlave = (obj, viejaLlave, nuevaLlave) => {
    let nuevoObjeto = {};

    for (let [k, v] of Object.entries(obj))
        if (k === viejaLlave) nuevoObjeto[nuevaLlave] = v;
        else nuevoObjeto[k] = v;

    return nuevoObjeto;
};

const OtroRegistroPlanificacion = () => {
    const titulos = ["ID", "Tareas", "Fecha Inicio", "Fecha Fin"];
    const fecha = new Date().toISOString().slice(0, 10);
    const ref = useRef(null);
    const [planificacion, setPlanificacion] = useState([]);

    useEffect(() =>{
        if(ref?.current){
            ref.current.focus();
        }
    }, [planificacion]);

    const planif3 = [
        {
            id: "Sprint 1",
            tareas: ["Tarea 1", "Tarea 2"],
            fecha_ini: fecha,
            fecha_fin: fecha,
        },
    ];


    const editarID = (ev, indexFila) => {
        const nuevoID = ev.target.value;
        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].id = nuevoID;
        setPlanificacion(nuevaPlanif);
    };

    const editarTarea = (ev, indexFila, indexTarea) => {
        const nuevaTarea = ev.target.value;
        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].tareas[indexTarea] = nuevaTarea;
        setPlanificacion(nuevaPlanif);
    };

    const agregarFila = () => {
        const nuevaPlanif = [...planificacion];
        nuevaPlanif.push({
            id: "",
            tareas: [],
            fecha_ini: fecha,
            fecha_fin: fecha,
        });
        setPlanificacion(nuevaPlanif);
    };

    const eliminarFila = (indexFila) => {
        setPlanificacion(planificacion.filter((v, i) => i !== indexFila));
    };

    const agregarTarea = (indexFila) => {
        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].tareas.push("");
        setPlanificacion(nuevaPlanif);
    };

    const eliminarTarea = (indexFila, indexTarea) => {
        const nuevaPlanif = [...planificacion];
        const nuevasTareas = nuevaPlanif[indexFila].tareas.filter(
            (v, i) => indexTarea !== i
        );
        nuevaPlanif[indexFila].tareas = nuevasTareas;
        setPlanificacion(nuevaPlanif);
    };

    const actualizarFecha = (ev, indexFila) => {
        const { name, value } = ev.target;
        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila][name] = value;
        setPlanificacion(nuevaPlanif);
    };

    return (
        <div className="container-fluid">
            <TituloRegistros titulo="Registro de Planificacion de Empresa"/>
            <div className="row">
                <div className="col">
                    <Tabla datos={titulos} px0={true} hover={false}>
                        {planificacion.map((p, idx) => {
                            const key = `f-${idx}`;
                            return (
                                <tr key={`${key}`}>
                                    <td
                                        key={`${key}-ID`}
                                        style={{ minWidth: "200px" }}
                                    >
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                name={`${key}-id`}
                                                value={p.id}
                                                ref={idx === planificacion.length - 1 ?  ref : undefined}
                                                className="form-control"
                                                placeholder="Titulo"
                                                onChange={(ev) => {
                                                    editarID(ev, idx);
                                                }}
                                            />
                                            <BotonControl
                                                tipo="<eliminar>"
                                                handle={() => {
                                                    eliminarFila(idx);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ minWidth: "200px" }}>
                                        <ul
                                            key={`${key}-Tarea`}
                                            className="list-group list-group-flush gap-1"
                                        >
                                            {p.tareas.map((t, i) => {
                                                return (
                                                    <li
                                                        key={`${key}-Tarea-${i}`}
                                                        className="list-group-item bg-inherit p-0 pb-1"
                                                    >
                                                        <div className="d-flex">
                                                            <input
                                                                type="text"
                                                                name={`${key}-t-${i}`}
                                                                value={t}
                                                                placeholder="Tarea"
                                                                className="form-control"
                                                                ref={p.tareas.length - 1 === i ?  ref : undefined}
                                                                onChange={(
                                                                    ev
                                                                ) => {
                                                                    editarTarea(
                                                                        ev,
                                                                        idx,
                                                                        i
                                                                    );
                                                                }}
                                                            />
                                                            <BotonControl
                                                                tipo="<eliminar>"
                                                                handle={() => {
                                                                    eliminarTarea(
                                                                        idx,
                                                                        i
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            <li className="list-group">
                                                <BotonControl
                                                    tipo="<agregar>"
                                                    handle={() => {
                                                        agregarTarea(idx);
                                                    }}
                                                />
                                            </li>
                                        </ul>
                                    </td>
                                    <td key={`${key}-f_i`}>
                                        <input
                                            className="form-control"
                                            type="date"
                                            style={{ maxWidth: "140px" }}
                                            name="fecha_ini"
                                            value={p.fecha_ini}
                                            onChange={(ev) => {
                                                actualizarFecha(ev, idx);
                                            }}
                                        />
                                    </td>
                                    <td key={`${key}-f_f`}>
                                        <input
                                            className="form-control"
                                            type="date"
                                            style={{ maxWidth: "140px" }}
                                            name="fecha_fin"
                                            value={p.fecha_fin}
                                            onChange={(ev) => {
                                                actualizarFecha(ev, idx);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </Tabla>
                    {!planificacion.length && (
                        <div className="text-center fw-bold mt-0 mb-2">
                            Agrega una Fila...
                        </div>
                    )}
                </div>
            </div>
            <div className="row g-0 bg-white py-3 ">
                <div className="col">
                    <div className="container">
                        <div className="row justify-content-center">
                            <label className="col-md-5">
                                Dia de Revisión
                                <input className="form-control" type="date" />
                            </label>

                            <label className="col-md-5">
                                Hora de Revisión
                                <input className="form-control" type="time" />
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row g-0 bg-white pb-3 rounded-bottom-3">
                <div className="col d-flex justify-content-center gap-2">
                    <button
                        className="btn btn-eva-secondary"
                        onClick={agregarFila}
                    >
                        Agregar Fila
                    </button>
                    <button className="btn btn-eva-secondary">Registrar</button>
                </div>
            </div>
        </div>
    );
};

export default OtroRegistroPlanificacion;
