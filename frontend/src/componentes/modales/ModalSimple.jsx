import { useEffect } from "react";
import color from "../../estilos/color";

const ModalSimple = ({
    mostrar = false,
    texto = "Texto a mostrar",
    cerrar,
    tipo = "normal",
}) => {
    const colorTexto = {
        normal: color.texto.oscuro,
        exito: color.texto.exito,
        error: color.texto.peligro,
        info: color.texto.info,
    };

    const handleTeclaCerrar = (ev) => {
        if( ev.key === "Escape" ){
            cerrar();
        }
    }

    const handleClickCerrar = (ev) => {
        if( ev.target.classList.contains("fade") ){
            cerrar();
        }
    }

    useEffect ( () =>{
        if(mostrar){
            document.addEventListener("keydown", handleTeclaCerrar);
            document.addEventListener("click", handleClickCerrar);
        }
        return () =>{
            document.removeEventListener("keydown", handleTeclaCerrar);
            document.removeEventListener("click", handleClickCerrar);
        };
    }, []);

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
                                <p className={`p-0 m-0 ${colorTexto[tipo]}`}>{texto}</p>
                            </div>
                        </div>
                        <div className="modal-footer p-3 pt-2 border-0">
                            <button
                                className="btn btn-eva-secondary"
                                onClick={cerrar}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSimple;
