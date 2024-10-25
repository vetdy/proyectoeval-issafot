import { useEffect, useState, useRef, Fragment } from "react";
import { Tabla } from "../componentes/tablas";
import { obtenerPlanillasEmpresa, obtenerItemsPlanilla } from "../servicios/api";

const PlanillasSeguimiento = () => {
    const [datos, setDatos] = useState(null);
    const [items, setItems] = useState(null);
    const [mostrar, setMostrar] = useState(null);
    const [error, setError] = useState(false);
    const consultar = useRef(true);

    useEffect( () =>{
        const planilla = async () =>{
            const p = await obtenerPlanillasEmpresa(1);
            console.log(p.status, p.message);
            if(p.status !== 200){
                setError(true);
            }
            else{
                const nuevosDatos = p.message.planilla_seguimiento;
                const nuevoMostrar = Array(nuevosDatos.length).fill(false);
                const nuevoItems = Array(nuevosDatos.length).fill(null);
                setDatos(nuevosDatos);
                setMostrar(nuevoMostrar);
                setItems(nuevoItems);
            }
        }
        if(consultar){
            consultar.current = false;
            planilla();
        }
    }, []);

    const titulos = ["ID", "Fecha", "Hora", "Detalle"];

    const actualizarItems = async (index) =>{
        const id_planilla = datos[index].id;
        const itemsJson = await obtenerItemsPlanilla(id_planilla);
        if(itemsJson.status === 200){
            const nuevoItems = [...items];
            nuevoItems[index] = [];
            itemsJson.message.item_planilla.forEach(i =>{
                nuevoItems[index].push(i.titulo);
            })
            setItems(nuevoItems);
        }
    }

    const showHide = (index) => {
        const nuevoMostrar = mostrar.map((m, idx) => {
            return idx === index ? ! m : m;
        });
        setMostrar(nuevoMostrar);

        if(! items[index]){
            actualizarItems(index);
        }   
    };

    return (
        <div>
            <h2 className="my-2 text-center fw-bold">
                Planillas de Seguimiento
            </h2>

            <div className="mx-4 mt-4">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3>
                            NOMBRE EMPRESA:{" "}
                            <span className="fw-bold">ISSA SOFT</span>
                        </h3>
                    </div>
                    <div>
                        <h3>
                            Docente:{" "}
                            <span className="fw-bold">Consultor TIS</span>
                        </h3>
                    </div>
                </div>
            </div>
            <br></br>
            {! error && datos ? (<Tabla key={`tabla-planilla-seg`} datos={titulos}>
                {datos.map((entrada, index) => {
                    const keyBase = `$f-${index}`;
                    const keyFila1 = `${keyBase}-f1`;
                    const keyFila2 = `${keyBase}-f2`;
                    return (
                        <Fragment key={`fila-compuesta-${index}`}>
                            <tr key={keyFila1}>
                                <td key={`${keyFila1}-titulo`}>
                                    {entrada.titulo}
                                </td>

                                <td key={`${keyFila1}-fecha`}>
                                    {entrada.fecha_revision}
                                </td>

                                <td key={`${keyFila1}-hora`}>
                                    {entrada.hora_revision}
                                </td>

                                <td key={`${keyFila1}-btn`}>
                                    <button
                                        key={`${keyFila1}-btn-b`}
                                        className="btn btn-eva-info"
                                        onClick={() => showHide(index)}
                                    >
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                            
                            <tr
                                key={keyFila2}
                                className={`${mostrar[index] ? "" : "d-none"}`}
                            >
                                <td
                                    key={`${keyFila2}-data`}
                                    colSpan={"4"}
                                    style={{ boxShadow: "none" }}
                                >
                                    <div
                                        key={`${keyFila2}-contenedor`}
                                        className="py-2 border-3 rounded-2"
                                        style={{ backgroundColor: "lightgray" }}
                                    >
                                        { items && items[index] ?
                                            (<ol 
                                                key={`${keyFila2}-lista`}
                                                className="m-0" 
                                            >
                                                {items[index].map((cad, i) => {
                                                    return (
                                                        <li 
                                                            key={`${keyFila2}-item-${i}`}
                                                        >
                                                            {cad}
                                                        </li>
                                                    );
                                                })}
                                            </ol>)
                                            : <p key={`${keyFila2}-sin-datos`}>{items && ! items[index] ? "Cargando..." : "No hay datos."}</p>
                                        }
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    );
                })}
            </Tabla>)
            : <p>Cargando...</p>
            }
        </div>
    );
};

export default PlanillasSeguimiento;
