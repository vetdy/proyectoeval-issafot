import { Tabla } from "../componentes/tablas";
import { BotonControl } from "../componentes/botones";
import { useState, useRef, useEffect } from "react";
import { TituloRegistros } from "../componentes/titulos";
import { validador } from "../utils";
import { ModalConfirmar } from "../componentes/modales";

const actualizarLlave = (obj, viejaLlave, nuevaLlave) => {
    let nuevoObjeto = {};

    for (let [k, v] of Object.entries(obj))
        if (k === viejaLlave) nuevoObjeto[nuevaLlave] = v;
        else nuevoObjeto[k] = v;

    return nuevoObjeto;
};

const compararFecha = (f1, f2) =>{
    const fecha1 = new Date(f1);
    const fecha2 = new Date(f2);

    if (fecha2 > fecha1){
        return 1
    }
    return 0
}

const limpiarTexto = (texto) => {
    let nuevoTexto = texto.replace(/[!-\/:-@[-`{-~]/, "");

    nuevoTexto = nuevoTexto.replace(/\s+/g, " ");

    if(texto.length > 0 && texto[0] === " "){
        nuevoTexto = nuevoTexto.replace(/^\s/, "");
    }

    return nuevoTexto
}

const OtroRegistroPlanificacion = () => {
    const titulos = ["Titulo", "Objetivos", "Fecha Inicio", "Fecha Fin"];
    const fecha = new Date().toISOString().slice(0, 10);
    const ref = useRef(null);
    const [planificacion, setPlanificacion] = useState([]);
    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        accion: null,
    });

    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
            ref.current = null;
        }
    }, [planificacion]);

    const abrirModal = (texto, accion) => {
        const nuevoModal = {
            mostrar: true,
            texto: texto,
            accion: accion
        };
        setModal(nuevoModal);
    };

    const cerrarModal = () => {
        setModal({
            mostrar: false,
            texto: "",
            accion: null,
        });
    };

    const editarID = (ev, indexFila) => {
        let nuevoID = ev.target.value;

        if ( !validador.alfanumerico(nuevoID) ){
            nuevoID = limpiarTexto(nuevoID);
        }

        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].id = nuevoID;
        setPlanificacion(nuevaPlanif);
    };

    const editarTarea = (ev, indexFila, indexTarea) => {
        let nuevaTarea = ev.target.value;

        if ( !validador.alfanumerico(nuevaTarea) ){
            nuevaTarea = limpiarTexto(nuevaTarea);
        }

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
        if( !planificacion[indexFila].id ){
            if( !planificacion[indexFila].tareas.length ){
                setPlanificacion(planificacion.filter((v, i) => i !== indexFila));
            }
            else{
                abrirModal(`La fila contiene Objetivos, eliminar de todas formas?`, 
                    () => {
                        setPlanificacion(planificacion.filter((v, i) => i !== indexFila));
                        cerrarModal();
                    }
                );
            }
        }            
        else{
            abrirModal(`Eliminar fila: ${planificacion[indexFila].id}?`, 
                () => {
                    setPlanificacion(planificacion.filter((v, i) => i !== indexFila));
                    cerrarModal();
                }
            );
        }
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
        if ( name === "fecha_fin" ){
            if( compararFecha(planificacion[indexFila].fecha_ini, value) ){
                nuevaPlanif[indexFila][name] = value;
                setPlanificacion(nuevaPlanif);
            }
            else{
                alert("La fecha fin Debe ser Mayor a la fecha inicio.");
            }
        }
        if ( name === "fecha_ini" ){
            nuevaPlanif[indexFila][name] = value;
            setPlanificacion(nuevaPlanif);
        }
    };

    const verificarID = (ev, indexFila) => {
        if (ev.target.value.trim() === "") {
            if (!planificacion[indexFila].tareas.length) {
                eliminarFila(indexFila);
            } else {
                ev.target.focus();
            }
        }
    };

    const verificarTarea = (ev, indexFila, indexTarea) => {
        if (ev.target.value.trim() === "") {
            eliminarTarea(indexFila, indexTarea);
        }
    };

    const verificarLetrasID = (ev, indexFila) => {
        if (ev.key === "Escape" && ev.target.value.trim() === "") {
            eliminarFila(indexFila);
        }
    };

    const verificarLetrasTarea = (ev, indexFila, indexTarea) => {
        if (ev.key === "Escape" && ev.target.value.trim() === "") {
            eliminarTarea(indexFila, indexTarea);
        }
    };

    return (
        <div className="container-fluid">
            {modal.mostrar && (
                <ModalConfirmar
                    texto={modal.texto}
                    tipo={"borrar"}
                    mostrar={modal.mostrar}
                    aceptar={modal.accion}
                    cancelar={cerrarModal}
                />
            )}
            <TituloRegistros titulo="Registro de Planificacion de Empresa" />
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
                                                ref={
                                                    idx ===
                                                    planificacion.length - 1
                                                        ? ref
                                                        : undefined
                                                }
                                                className="form-control"
                                                placeholder="Titulo"
                                                maxLength={40}
                                                onChange={(ev) => {
                                                    editarID(ev, idx);
                                                }}
                                                onBlur={(ev) =>
                                                    verificarID(ev, idx)
                                                }
                                                onKeyDown={(ev) => {
                                                    verificarLetrasID(ev, idx);
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
                                                                placeholder="Objetivo"
                                                                maxLength={64}
                                                                className="form-control"
                                                                ref={
                                                                    p.tareas
                                                                        .length -
                                                                        1 ===
                                                                    i
                                                                        ? ref
                                                                        : undefined
                                                                }
                                                                onChange={(
                                                                    ev
                                                                ) => {
                                                                    editarTarea(
                                                                        ev,
                                                                        idx,
                                                                        i
                                                                    );
                                                                }}
                                                                onBlur={(
                                                                    ev
                                                                ) => {
                                                                    verificarTarea(
                                                                        ev,
                                                                        idx,
                                                                        i
                                                                    );
                                                                }}
                                                                onKeyDown={(
                                                                    ev
                                                                ) => {
                                                                    verificarLetrasTarea(
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
                                <select className="form-select">
                                    <option value="1">Lunes</option>
                                    <option value="2">Martes</option>
                                    <option value="3">Miercoles</option>
                                    <option value="4">Jueves</option>
                                    <option value="5">Viernes</option>
                                </select>
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
