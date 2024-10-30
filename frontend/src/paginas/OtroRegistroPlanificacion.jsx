import { Tabla } from "../componentes/tablas";
import { BotonControl } from "../componentes/botones";
import { useState, useRef, useEffect } from "react";
import { TituloRegistros } from "../componentes/titulos";
import { validador } from "../utils";
import { ModalConfirmar, ModalSimple } from "../componentes/modales";
import { registrarPlanificacionEmpresa } from "../servicios/api"
import { cadenaValoresJSON } from "../utils/conversor";
import { tiempo } from "../utils";

const compararFecha = (f1, f2 = undefined) => {
    const fecha1 = typeof f1 === "string" ? new Date(f1) : f1;
    const fecha2 =
        typeof f2 === "undefined"
            ? new Date(tiempo.obtenerFechaActual())
            : typeof f2 === "string"
            ? new Date(f2)
            : f2;

    if ( fecha1.getTime() > fecha2.getTime() ) {
        return 1;
    }
    if ( fecha1.getTime() < fecha2.getTime() ){
        return -1;
    }
    return 0;
};

const limpiarTexto = (texto) => {
    let nuevoTexto = texto.replace(/[!-\/:-@[-`{-~]/, "");

    nuevoTexto = nuevoTexto.replace(/\s+/g, " ");

    if (texto.length > 0 && texto[0] === " ") {
        nuevoTexto = nuevoTexto.replace(/^\s/, "");
    }

    return nuevoTexto;
};

const titulosIguales = (plan=[]) => {
    const titulos = {}
    const repetidos = []

    plan.forEach( (p, idx) => {
        const t = p.titulo.trim();
        
        if( titulos[t] ){
            repetidos.push(idx);
            return;
        }
        else{
            titulos[t] = true;
        }
    });

    return repetidos.length ? repetidos[0] : -1;
}

const quitarEspaciosFinales = (plan=[]) => {
    const nuevoPlan = []
    for(const p of plan){
        p.titulo = p.titulo.trim();
        p.tarea = p.tarea.map(v => v.trim());
        nuevoPlan.push(p);
    }
    return nuevoPlan;
}

const OtroRegistroPlanificacion = () => {
    const titulos = ["Titulo", "Objetivo", "Fecha Inicio", "Fecha Fin"];
    const fecha = tiempo.obtenerFechaActual();
    const ref = useRef(null);
    const [fechasValidadProyecto, setFechasValidasProyecto] = useState({
        fecha_inicio: "",
        fecha_fin: ""
    });
    const [planificacion, setPlanificacion] = useState([]);
    const [revision, setRevision] = useState({
        dia_rev: "1",
        hora_rev: "08:15",
    });
    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        accion: null,
    });
    const [modalInf, setModalInf] = useState({
        mostrar: false,
        tipo: "",
        texto: ""
    });
    const [deshabilitarEnvio, setDeshabilitarEnvio] = useState(false);

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
            accion: accion,
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

    const AbrirModalInf = (texto, tipo="error") => {
        const nuevoModal = {
            mostrar: true,
            tipo: tipo,
            texto: texto
        };
        setModalInf(nuevoModal);
    }

    const cerrarModalInf = () => {
        setModalInf({
            mostrar: false,
            tipo: "",
            texto: "",
        });
    };

    const editarTitulo = (ev, indexFila) => {
        let nuevoTitulo = ev.target.value;

        if (!validador.alfanumerico(nuevoTitulo)) {
            nuevoTitulo = limpiarTexto(nuevoTitulo);
        }

        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].titulo = nuevoTitulo;
        setPlanificacion(nuevaPlanif);
    };

    const editarTarea = (ev, indexFila, indexTarea) => {
        let nuevaTarea = ev.target.value;

        if (!validador.alfanumerico(nuevaTarea)) {
            nuevaTarea = limpiarTexto(nuevaTarea);
        }

        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].tarea[indexTarea] = nuevaTarea;
        setPlanificacion(nuevaPlanif);
    };

    const agregarFila = () => {
        const nuevaPlanif = [...planificacion];
        nuevaPlanif.push({
            titulo: "",
            tarea: [],
            fecha_inicio: fecha,
            fecha_fin: fecha,
        });
        setPlanificacion(nuevaPlanif);
    };

    const eliminarFila = (indexFila) => {
        if (!planificacion[indexFila].titulo) {
            if (!planificacion[indexFila].tarea.length) {
                setPlanificacion(
                    planificacion.filter((v, i) => i !== indexFila)
                );
            } else {
                abrirModal(
                    `La fila contiene Objetivos, eliminar de todas formas?`,
                    () => {
                        setPlanificacion(
                            planificacion.filter((v, i) => i !== indexFila)
                        );
                        cerrarModal();
                    }
                );
            }
        } else {
            abrirModal(
                `Eliminar fila: ${planificacion[indexFila].titulo}?`,
                () => {
                    setPlanificacion(
                        planificacion.filter((v, i) => i !== indexFila)
                    );
                    cerrarModal();
                }
            );
        }
    };

    const agregarTarea = (indexFila) => {
        const nuevaPlanif = [...planificacion];
        nuevaPlanif[indexFila].tarea.push("");
        setPlanificacion(nuevaPlanif);
    };

    const eliminarTarea = (indexFila, indexTarea) => {
        const nuevaPlanif = [...planificacion];
        const nuevaTarea = nuevaPlanif[indexFila].tarea.filter(
            (v, i) => indexTarea !== i
        );
        nuevaPlanif[indexFila].tarea = nuevaTarea;
        setPlanificacion(nuevaPlanif);
    };

    const actualizarFecha = (ev, indexFila) => {
        const { name, value } = ev.target;
        const nuevaPlanif = [...planificacion];
        if (name === "fecha_fin") {
            if (compararFecha(planificacion[indexFila].fecha_inicio, value)) {
                nuevaPlanif[indexFila][name] = value;
                setPlanificacion(nuevaPlanif);
            } else {
                AbrirModalInf("La fecha fin Debe ser Mayor a la fecha inicio.");
            }
        }
        if (name === "fecha_inicio") {
            nuevaPlanif[indexFila][name] = value;
            setPlanificacion(nuevaPlanif);
        }
    };

    const verificarTitulo = (ev, indexFila) => {
        if (ev.target.value.trim() === "") {
            if (!planificacion[indexFila].tarea.length) {
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

    const verificarLetrasTitulo = (ev, indexFila) => {
        if (ev.key === "Escape" && ev.target.value.trim() === "") {
            eliminarFila(indexFila);
        }
    };

    const verificarLetrasTarea = (ev, indexFila, indexTarea) => {
        if (ev.key === "Escape" && ev.target.value.trim() === "") {
            eliminarTarea(indexFila, indexTarea);
        }
    };

    const editarRevision = (ev) => {
        const { name, value } = ev.target;
        const nuevaRevision = { ...revision };
        nuevaRevision[name] = value;
        setRevision(nuevaRevision);
    };

    const controlDatos = () => {
        const fechaFinProyecto = "2024-12-02"

        if ( planificacion.length ) {
            const duplicados = titulosIguales(planificacion);
            
            if( duplicados !== -1 ){
                AbrirModalInf(`Existen titulos duplicados: ${planificacion[duplicados].titulo}`);
                return false;
            }

            for (const p of planificacion) {
                if (p.titulo === "") {
                    AbrirModalInf("Ningun titulo puede estar vacio");
                    return false;
                }

                if ( !p.tarea.length ) {
                    AbrirModalInf(`Debe haber al menos 1 objetivo por fila. En la fila con titulo: ${p.titulo}`);
                    return false;
                }
                
                for ( const t of p.tarea ) {
                    if (t === "") {
                        AbrirModalInf(`Ningun objetivo puede ser vacio. En la fila con titulo: ${p.titulo}`);
                        return false;
                    }
                }

                if ( compararFecha(p.fecha_inicio) === -1 ){
                    AbrirModalInf(`La fecha inicio debe ser mayor o igual a la fecha actual. En la fila con titulo: ${p.titulo}`);
                    return false;
                }
                
                if ( compararFecha(p.fecha_inicio, p.fecha_fin) !== -1) {
                    AbrirModalInf(`La fecha fin debe ser mayor a la Fecha Inicio. En la fila con titulo: ${p.titulo}`);
                    return false;
                }

                if (compararFecha(p.fecha_inicio, fechaFinProyecto) === 1){
                    AbrirModalInf(`La fecha inicio no puede ser mayor a la Fecha establecida de duración del proyecto (${fechaFinProyecto}). En la fila con titulo: ${p.titulo}`);
                    return false;
                }

                if (compararFecha(p.fecha_fin, fechaFinProyecto) === 1){
                    AbrirModalInf(`La fecha fin no puede ser mayor a la Fecha establecida de duración del proyecto (${fechaFinProyecto}). En la fila con titulo: ${p.titulo}`);
                    return false;
                }
            }
            return true;
        } else {
            AbrirModalInf("Debe llenar al menos una fila con datos.");
            return false;
        }
    };

    const enviarDatos = async (ev) => {
        const datos = {};
        if ( controlDatos() ) {
            setDeshabilitarEnvio(true);
            datos["id_proyecto_empresa"] = "2"; //<=== Debe cambiar con usuario/empresa
            datos["dia_revision"] = revision.dia_rev;
            datos["hora_revision"] = revision.hora_rev;
            datos["planificacion"] = quitarEspaciosFinales(planificacion);
            const res = await registrarPlanificacionEmpresa(datos);
            if (res.status === 200){
                AbrirModalInf("Se ha registrado la planificación", "normal");
            }
            else if ( res.status === 422 ){
                AbrirModalInf( cadenaValoresJSON(res.message) );
            }
            else{
                AbrirModalInf( res.message );
            }
            setDeshabilitarEnvio(false);
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
            {modalInf.mostrar && (
                <ModalSimple
                    mostrar={modalInf.mostrar}
                    texto={modalInf.texto}
                    tipo={modalInf.tipo}
                    cerrar={cerrarModalInf}
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
                                                value={p.titulo}
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
                                                    editarTitulo(ev, idx);
                                                }}
                                                onBlur={(ev) =>
                                                    verificarTitulo(ev, idx)
                                                }
                                                onKeyDown={(ev) => {
                                                    verificarLetrasTitulo(
                                                        ev,
                                                        idx
                                                    );
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
                                            {p.tarea.map((t, i) => {
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
                                                                    p.tarea.length - 1 === i
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
                                            name="fecha_inicio"
                                            value={p.fecha_inicio}
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
                                <select
                                    name="dia_rev"
                                    className="form-select"
                                    value={revision.dia_rev}
                                    onChange={editarRevision}
                                >
                                    <option value="1">Lunes</option>
                                    <option value="2">Martes</option>
                                    <option value="3">Miercoles</option>
                                    <option value="4">Jueves</option>
                                    <option value="5">Viernes</option>
                                </select>
                            </label>

                            <label className="col-md-5">
                                Hora de Revisión
                                <select
                                    name="hora_rev"
                                    className="form-select"
                                    value={revision.hora_rev}
                                    onChange={editarRevision}
                                >
                                    <option value="08:15">08:15</option>
                                    <option value="09:45">09:45</option>
                                    <option value="11:15">11:15</option>
                                    <option value="12:45">12:45</option>
                                    <option value="14:15">14:15</option>
                                    <option value="15:45">15:45</option>
                                    <option value="17:15">17:15</option>
                                    <option value="18:45">18:45</option>
                                </select>
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
                    <button
                        className="btn btn-eva-secondary"
                        onClick={enviarDatos}
                        disabled={deshabilitarEnvio}
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtroRegistroPlanificacion;
