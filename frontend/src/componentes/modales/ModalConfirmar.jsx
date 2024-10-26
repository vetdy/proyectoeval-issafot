import { useEffect } from "react";

const ModalConfirmar = ({
    mostrar = false,
    texto = "Texto a confirmar",
    aceptar,
    cancelar,
    tipo = "normal",
}) => {
    const estilosAceptar = {
        normal: "btn-eva-secondary",
        borrar: "btn-eva-danger",
        agregar: "btn-eva-success",
    };

    const handleTeclaCerrar = (ev) => {
        if( ev.key === "Escape" ){
            cancelar();
        }
    }

    useEffect ( () =>{
        if(mostrar){
            document.addEventListener("keydown", handleTeclaCerrar);
        }
        return () =>{
            document.removeEventListener("keydown", handleTeclaCerrar);
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
                                <h6 className="m-0 p-0 fw-bold mb-2">
                                    Confirmar:
                                </h6>
                                <p className="p-0 m-0">{texto}</p>
                            </div>
                        </div>
                        <div className="modal-footer p-3 pt-2 border-0">
                            <button
                                className={`btn text-white ${estilosAceptar[tipo]}`}
                                onClick={aceptar}
                            >
                                Aceptar
                            </button>
                            <button
                                className="btn btn-eva-secondary"
                                onClick={cancelar}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmar;
