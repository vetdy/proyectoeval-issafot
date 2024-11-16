import { useEffect } from "react";
import color from "../../estilos/color";

const Modal = ({
    mostrar = false,
    texto = "Texto a mostrar",
    tipo = "simple",
    estilo = "normal",
    aceptar,
    cancelar,
}) => {
    /* const tipos = {
        simple,
        confirmar,
        temporal,
    } */

    const estilos = {
        normal: {
            texto: color.texto.oscuro,
            boton: "btn-eva-secondary"
        },
        eliminar: {
            texto: color.texto.peligro,
            boton: "btn-eva-danger"
        },
        info:{
            texto: color.texto.info,
            boton: "btn-eva-info"
        }
    }

    const handleTeclaEsc = (ev) => {
        if( ev.key === "Escape" ){
            if( tipo === "simple" ){
                aceptar();
            }
            else{
                cancelar();
            }
        }
    }

    const handleClickOutside = (ev) => {
        if( ev.target.classList.contains("fade") ){
            if( tipo === "simple" ){
                aceptar();
            }
            else{
                cancelar();
            }
        }
    }

    useEffect ( () =>{
        let temp;
        if(mostrar){
            if(tipo === "temporal"){
                temp = setTimeout(aceptar, 1000);
            }
            else{
                document.addEventListener("keydown", handleTeclaEsc);
                document.addEventListener("click", handleClickOutside);                
            }
        }
        return () =>{
            if(tipo === "temporal"){
                clearTimeout(temp);
            }
            else{
                document.removeEventListener("keydown", handleTeclaEsc);
                document.removeEventListener("click", handleClickOutside);
            }
        };
    }, []);

    if( tipo === "temporal" ){
        return(
            <div className="position-static top-0 bg-white rouned rounded-1">
                <p className={`${estilos[estilo].texto}`}>{texto}</p>
                <button className={`btn ${estilos[estilo].boton}`}
                    onClick={aceptar}
                >Cerrar</button>
            </div>
        );
    }

    return (
        <div>
            <div
                className={`fade modal-backdrop ${mostrar ? "show" : ""}`}
            ></div>
            <div className= {`fade modal ${mostrar ? "show modal-show" : ""}`}>
                <div className={`modal-dialog show ${mostrar ? "show" : ""}`}>
                    <div className="modal-content">
                        <div
                            className="modal-body border-0 pb-0"
                            style={{
                                whiteSpace: "pre-line",
                                wordBreak: "break-word",
                            }}
                        >
                            <div className="container">
                                <p 
                                    className={`p-0 m-0 ${estilos[estilo].texto}`}
                                >{texto}</p>
                            </div>
                        </div>
                        <div className="modal-footer p-3 pt-2 border-0">
                            <button
                                className={`btn text-white ${estilos[estilo].boton}`}
                                onClick={aceptar}
                            >
                                Aceptar
                            </button>
                            {tipo === "confirmar" && (
                                <button
                                    className="btn btn-eva-secondary"
                                    onClick={cancelar}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
