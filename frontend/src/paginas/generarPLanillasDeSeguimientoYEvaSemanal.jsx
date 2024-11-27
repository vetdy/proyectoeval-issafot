import { useState, useEffect } from "react";
import { Modal } from "../componentes/modales";
import { generarPlanillasProyectoEmpresa } from "../servicios/api";
import { IconoCargando } from "../componentes/iconos";

function GenerarPlanillas() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generando, setGenerando] = useState(false);
    const [modal, setModal] = useState({
        mostrar: false,
        texto: "",
        aceptar: null,
    })

    const abrirModal = (texto, aceptar = null) => {
        const nuevoModal = {
            mostrar: true,
            texto: texto,
            aceptar: cerrarModal,
        }
        if( aceptar !== null ){
            nuevoModal.aceptar = aceptar;
        }
        setModal(nuevoModal);
    }

    const cerrarModal = () =>{
        setModal({
            mostrar: false,
            texto:"",
            aceptar:null
        })
    }

    // Obtener empresas desde el endpoint específico
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/proyecto_empresa/docente/1");
    
                // Verifica si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`Error al obtener las empresas: ${response.status}`);
                }
    
                const data = await response.json();
                console.log(data);
                // Asegúrate de que los datos estén en la forma correcta
                if (data.contenido && data.contenido.proyecto_por_docente) {
                    setEmpresas(data.contenido.proyecto_por_docente);
                } else {
                    console.error("Datos no encontrados en la respuesta:", data);
                    setEmpresas([]);
                }
            } catch (error) {
                console.error("Error al obtener empresas:", error);
                setEmpresas([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEmpresas();
    }, []);
    

    // Función para generar planilla individual
    const generarPlanilla = async (empresa) => {
        if (empresa.estado === "aceptado") {
            if(empresa.planillas_creada){
                abrirModal(`La planilla para ${empresa.nombre_empresa} ya esta generada.`);
                return;
            }
            setGenerando(true);
            const consulta = await generarPlanillasProyectoEmpresa(empresa.id_proyecto_empresa);
            if( consulta.status === 200 ){
                abrirModal(`Se han generado las planillas para ${empresa.nombre_empresa}`,
                    () => {window.location.reload()}
                );
            }
            else{
                abrirModal(consulta.message);
            }
            setGenerando(false);
        }
    };

    // Función para generar planillas para todas las empresas aceptadas
    const generarTodas = async () => {
        const aceptadas = empresas.filter((empresa) => empresa.estado === "aceptado" && !empresa.planillas_creada);
        if (!aceptadas.length) {
            abrirModal("No hay empresas para generar planillas.");
            return;
        }
        setGenerando(true);
        const consultas = aceptadas.map( a => generarPlanillasProyectoEmpresa(a.id_proyecto_empresa) );
        const res = await Promise.all( consultas );
        if( res.every( r =>  r.status === 200) ){
            abrirModal(`Se han generado planillas para: ${aceptadas.map( a => a.nombre_empresa).join(", ")}`,
                () => {window.location.reload()}
            );
        }
        else{
            if( res.some( r => {r.status === 200}) ){
                const done = res.filter(r => r.status === 200);
                const fail = res.filter(r => r.status !== 200);
                abrirModal(
                    `Se genero planillas para: ${done
                        .map((d) => d.nombre_empresa)
                        .join(
                            ", "
                        )}.\n Fallo la generación de planillas para ${fail
                        .map((f) => f.nombre_empresa)
                        .join(", ")}`,
                    () => {
                        window.location.reload();
                    }
                );
            }
            else{
                abrirModal("Ocurrio un error");
            }
        }
    };

    // mensaje mientras se cargan los datos
    if (loading) {
        return <p>Cargando datos...</p>;
    }

    // mensaje si no hay empresas disponibles
    if (empresas.length === 0) {
        return <p>No hay empresas disponibles.</p>;
    }

    return (
        <div className="container mt-5">
            {modal.mostrar && (
                <Modal
                    mostrar={modal.mostrar}
                    texto={modal.texto}
                    aceptar={modal.aceptar}
                />
            )}
            {generando && (
                <IconoCargando tipo="linea"/>
            )}
            <h2 className="text-center mb-4">Generar Planillas de Seguimiento y Evaluación Semanal</h2>
            <table className="table table-striped ">
                <thead className="table table-sm my-0 table-hover">
                    <tr>
                        <th scope="col" className="bg-eva-secondary text-eva-light">Empresa</th>
                        <th scope="col" className="bg-eva-secondary text-eva-light">Estado Planif.</th>
                        <th scope="col" className="bg-eva-secondary text-eva-light">Generar</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((empresa, index) => (
                        <tr key={index}>
                            <td>{empresa.nombre_empresa}</td> {/* Asegúrate de usar el campo correcto */}
                            <td>{empresa.estado}</td> {/* Usa el estado correctamente */}
                            <td>
                                {empresa.estado !== "aceptado" && (
                                    "No disponible"
                                )}
                                {empresa.estado === "aceptado" && empresa.planillas_creada && (
                                    "Ya esta generada"
                                )}
                                {empresa.estado === "aceptado" && !empresa.planillas_creada && (
                                    <button
                                        className="btn fw-bold w-100 btn-eva-secondary"
                                        onClick={() => generarPlanilla(empresa)}
                                        disabled={generando}
                                    >
                                        Generar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button className="btn fw-bold btn-eva-secondary" 
                    onClick={generarTodas}
                    disabled={generando}
                >
                    Generar todas
                </button>
            </div>
        </div>
    );
}

export default GenerarPlanillas;
