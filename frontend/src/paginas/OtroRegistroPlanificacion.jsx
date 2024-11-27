import { Tabla } from "../componentes/tablas";
import { BotonControl } from "../componentes/botones";
import { useState, useRef, useEffect } from "react";
import { TituloRegistros } from "../componentes/titulos";
import { validador } from "../utils";
import { Modal } from "../componentes/modales";
import {
    registrarPlanificacionEmpresa,
    obtenerPlanificacionEmpresa,
    obtenerEstadoPlanificacionProyectoEmpresa,
    borrarPlanificacionEmpresa,
} from "../servicios/api";
import { cadenaValoresJSON } from "../utils/conversor";
import { tiempo } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { IconoCargando } from "../componentes/iconos";

const reconstruirPlanificacion = (datos=[]) => {
    const nuevosDatos = datos.map(d =>{
        return(
            {
                titulo: d.titulo,
                tarea: d.items.map(i => {return i.nombre}),
                fecha_inicio: tiempo.normalizarFecha(d.fecha_inicio),
                fecha_fin: tiempo.normalizarFecha(d.fecha_fin),
                id: d.id,
            }
        );
    });
    return nuevosDatos;
}

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

    return repetidos;
}

const entregablesIguales = (plan = []) => {
    const repetidos = [];

    plan.forEach( (p, idx ) => {
        const entregables = {};
        p.tarea.forEach( (t, i) => {
            if( entregables[t] ){
                repetidos.push([idx, i]);
                return;
            }
            else{
                entregables[t] = true;
            }
        });
    });
    return repetidos;
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
    const titulos = ["Hito", "Entregable", "Fecha Inicio", "Fecha Fin"];
    const estadosPlanificacion = {
        1:"No Existe",
        2:"En Revisión",
        3:"Aceptado",
        4:"Rechazado"
    }
    const fecha = tiempo.obtenerFechaActual();
    const ref = useRef(null);

    const [planificacion, setPlanificacion] = useState([]);
    const [revision, setRevision] = useState({
        dia_rev: "1",
        hora_rev: "08:15",
    });
    const [observaciones, setObservaciones] = useState("");
    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        tipo: "",
        estilo: "",
        aceptar: null,
        cancelar: null,
    });

    const [cargando, setCargando] = useState(true);
    const [estadoPlanif, setEstadoPlanif] = useState(1);

    const [editable, setEditable] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState(false);

    const refCarga = useRef(true);
    const refPlanPrevio = useRef(null);

    const datosPlanificacion = useLocation();
    const history = useNavigate();
    const proyEmpID = useRef(null);

    useEffect(()=>{
        const irProyectos = () => {history("/mi-proyecto")};
        const cargarDatos = async () => {
            proyEmpID.current = datosPlanificacion.state.id_empresa;
            let nuevoEstado = 0;
            let nuevoError = false;
            const consultaEstado = await obtenerEstadoPlanificacionProyectoEmpresa(proyEmpID.current);
            if( consultaEstado.status === 200 ){
                nuevoEstado = consultaEstado.message.revision_planificacion.id_estado_planificacion;
                if( nuevoEstado === 2 || nuevoEstado === 3 ){
                    setEditable(false);
                }
                setObservaciones(consultaEstado.message.revision_planificacion.observacion);
            }
            else{
                nuevoError = true;
            }

            if( !nuevoError && nuevoEstado > 1){
                const consultaPlan = await obtenerPlanificacionEmpresa(proyEmpID.current);
                if( consultaPlan.status === 200 ){
                    const previo = consultaPlan.message.planifiaciones_ob;
                    console.log(previo);
                    setPlanificacion( reconstruirPlanificacion( previo ) );
                    refPlanPrevio.current = previo;
                    setRevision({
                        dia_rev: previo[0].dia_revision,
                        hora_rev: previo[0].hora_revision
                            .split(":")
                            .map((h) => h.padStart(2, "0"))
                            .join(":"),
                    });
                }
                else{
                    nuevoError = true;
                }
            }
            setCargando(false);
            setError(nuevoError);
            setEstadoPlanif(nuevoEstado);
        };
        if( !datosPlanificacion.state ){
            irProyectos();
        }
        if(refCarga.current){
            refCarga.current = false;
            cargarDatos();
        }
    },[]);

    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
            ref.current = null;
        }
    }, [planificacion]);

    const abrirModal = (texto, funcion=null, tipo="simple") => {
        const nuevoModal = {
            mostrar: true,
            texto: texto,
            tipo: tipo,
            estilo: "normal",
            aceptar: cerrarModal,
            cancelar: null,
        };
        if( tipo === "simple" && funcion !== null ){
            nuevoModal.aceptar = funcion;
        }
        if( tipo === "confirmar" ){
            nuevoModal.estilo = "eliminar";
            nuevoModal.aceptar = funcion;
            nuevoModal.cancelar = cerrarModal;
        }
        if( tipo === "temporal" ){
            nuevoModal.estilo = "info";
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
                    "La fila no esta vacia, eliminar de todas formas?",
                    () => {
                        setPlanificacion(
                            planificacion.filter((v, i) => i !== indexFila)
                        );
                        cerrarModal();
                    },
                    "confirmar"
                );
            }
        } else {
            abrirModal(
                `Eliminar Hito: ${planificacion[indexFila].titulo}?`,
                () => {
                    setPlanificacion(
                        planificacion.filter((v, i) => i !== indexFila)
                    );
                    cerrarModal();
                },
                "confirmar"
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
                abrirModal("La fecha fin Debe ser Mayor a la fecha inicio.");
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
            console.log(duplicados.length)
            if( duplicados.length ){
                console.log(duplicados);
                abrirModal(`Existen titulos duplicados: ${planificacion[duplicados].titulo}`);
                return false;
            }
            
            const duplicados2 = entregablesIguales(planificacion);

            if( duplicados2.length ){
                const [t, e] = duplicados2[0];

                abrirModal(
                    `Existen entregables duplicados en el hito ${planificacion[t].titulo}: ${
                        planificacion[t].tarea[e]
                    }`
                );
                return false;
            }

            for (const p of planificacion) {
                if (p.titulo === "") {
                    abrirModal("Ningun titulo puede estar vacio");
                    return false;
                }

                if ( !p.tarea.length ) {
                    abrirModal(`Debe haber al menos 1 entregable por fila. En el hito: ${p.titulo}`);
                    return false;
                }
                
                for ( const t of p.tarea ) {
                    if (t === "") {
                        abrirModal(`Ningun entregable puede ser vacio. En el hito: ${p.titulo}`);
                        return false;
                    }
                }

                /* if ( compararFecha(p.fecha_inicio) === -1 ){
                    abrirModal(`La fecha inicio debe ser mayor o igual a la fecha actual. En el hito: ${p.titulo}`);
                    return false;
                } */
                
                if ( compararFecha(p.fecha_inicio, p.fecha_fin) !== -1) {
                    abrirModal(`La fecha fin debe ser mayor a la Fecha Inicio. En el hito: ${p.titulo}`);
                    return false;
                }

                /* if (compararFecha(p.fecha_inicio, fechaFinProyecto) === 1){
                    abrirModal(`La fecha inicio no puede ser mayor a la Fecha establecida de duración del proyecto (${fechaFinProyecto}). En el hito: ${p.titulo}`);
                    return false;
                }

                if (compararFecha(p.fecha_fin, fechaFinProyecto) === 1){
                    abrirModal(`La fecha fin no puede ser mayor a la Fecha establecida de duración del proyecto (${fechaFinProyecto}). En el hito: ${p.titulo}`);
                    return false;
                } */
            }
            return true;
        } else {
            abrirModal("Debe llenar al menos un hito con entregables.");
            return false;
        }
    };

    const enviarPlanificacion = async (ev) => {
        const datos = {};

        const irProyectos = () => { history("/mi-proyecto") };

        if ( controlDatos() ) {
            setEnviando(true);
            if( estadoPlanif === 1 ){
                datos["id_proyecto_empresa"] = proyEmpID.current;
                datos["dia_revision"] = revision.dia_rev;
                datos["hora_revision"] = revision.hora_rev;
                datos["planificacion"] = quitarEspaciosFinales(planificacion);
                const res = await registrarPlanificacionEmpresa(datos);
                if (res.status === 200){
                    abrirModal("Se ha enviado la planificación", 
                        () =>{window.location.reload()}
                    );
                }
                else if ( res.status === 422 ){
                    abrirModal( cadenaValoresJSON(res.message) );
                }
                else{
                    abrirModal( res.message );
                }
            }
            setEnviando(false);
        }
    };

    const modificarPlanificacion = async (ev) => {
        const datos = {};

        if ( controlDatos() ) {
            setEnviando(true);
            if( estadoPlanif === 4 ){
                datos["id_proyecto_empresa"] = proyEmpID.current;
                datos["dia_revision"] = revision.dia_rev;
                datos["hora_revision"] = revision.hora_rev;
                datos["planificacion"] = quitarEspaciosFinales(planificacion);

                const listaBorrar = [];
                refPlanPrevio.current.forEach( p =>{
                    listaBorrar.push( borrarPlanificacionEmpresa(p.id) );
                });

                const resBorrar = await Promise.all(listaBorrar);
                let cancelarOP = false;

                resBorrar.forEach( (r, i) => {
                    if( !(r.status === 200 || r.status === 404) ){
                        console.error(`No se borro el itemID=${refPlanPrevio.current[i].id}`);
                        cancelarOP = true;
                    }
                });
                if(cancelarOP){
                    abrirModal( "Ocurrio un error." );
                }
                else{
                    const res = await registrarPlanificacionEmpresa(datos);
                    if (res.status === 200){
                        abrirModal("Se ha enviado la planificación.", 
                            () =>{window.location.reload()}
                        );
                    }
                    else if ( res.status === 422 ){
                        abrirModal( cadenaValoresJSON(res.message) );
                    }
                    else{
                        abrirModal( res.message );
                    }
                }
            }
            setEnviando(false);
        }
    }

    if ( cargando ){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <IconoCargando/>
                    </div>
                </div>
            </div>
        );
    }

    if( error ){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center">
                        <h4 className="m-0">
                            Ocurrio un error. 
                        </h4>
                        <button 
                            className="btn btn-link text-eva-dark fs-5 fw-medium"
                            onClick={()=>{window.location.reload()}}
                        >Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
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
            {enviando && (
                <div className="row">
                    <IconoCargando tipo="linea"/>
                </div>
            )}
            <TituloRegistros titulo="Planificación de Empresa" />
            <div className="row">
                <div className="col d-flex align-items-center">
                    <h6 className="m-0">Estado Planif.:</h6>
                    <p className="m-0 px-2">{estadosPlanificacion[estadoPlanif]}</p>
                </div>
            </div>
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
                                                placeholder="Nombre del Hito"
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
                                                disabled={!editable}
                                            />
                                            {editable && (
                                                <BotonControl
                                                    tipo="<eliminar>"
                                                    handle={() => {
                                                        eliminarFila(idx);
                                                    }}
                                                />
                                            )}
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
                                                                placeholder="Nombre del Entregable"
                                                                maxLength={64}
                                                                className="form-control"
                                                                ref={
                                                                    p.tarea
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
                                                                disabled={!editable}
                                                            />
                                                            {editable && (
                                                                <BotonControl
                                                                    tipo="<eliminar>"
                                                                    handle={() => {
                                                                        eliminarTarea(
                                                                            idx,
                                                                            i
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            {editable && (
                                                <li className="list-group">
                                                    <BotonControl
                                                        tipo="<agregar>"
                                                        handle={() => {
                                                            agregarTarea(idx);
                                                        }}
                                                    />
                                                </li>
                                            )}
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
                                            disabled={!editable}
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
                                            disabled={!editable}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </Tabla>
                    {!planificacion.length && (
                        <div className="text-center fw-bold mt-0 mb-2">
                            Agrega un Hito...
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
                                    disabled={!editable}
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
                                    disabled={!editable}
                                >
                                    <option value="06:45">06:45</option>
                                    <option value="08:15">08:15</option>
                                    <option value="09:45">09:45</option>
                                    <option value="11:15">11:15</option>
                                    <option value="12:45">12:45</option>
                                    <option value="14:15">14:15</option>
                                    <option value="15:45">15:45</option>
                                    <option value="17:15">17:15</option>
                                    <option value="18:45">18:45</option>
                                    <option value="20:15">20:15</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {editable && (
                <div className="row g-0 bg-white pb-3 rounded-bottom-3">
                    <div className="col d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-eva-secondary"
                            onClick={agregarFila}
                        >
                            Agregar Hito
                        </button>
                        {estadoPlanif === 1 && (
                            <button
                                className="btn btn-eva-secondary"
                                onClick={enviarPlanificacion}
                                disabled={enviando}
                            >
                                Enviar
                            </button>
                        )}
                        {estadoPlanif === 4 && (
                            <button
                                className="btn btn-eva-secondary"
                                onClick={modificarPlanificacion}
                                disabled={enviando}
                            >
                                Enviar
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col">
                    <h6>Observaciones</h6>
                    <textarea
                        name=""
                        id=""
                        value={observaciones}
                        className="w-100 user-select-none"
                        disabled={true}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default OtroRegistroPlanificacion;
