
const Modal = ({children, titulo="", mostrar=false, cerrar, ...props}) => {

    return(
        <>
        <div className= {`fade modal-backdrop ${mostrar ? "show" : ""}`}></div>
        <div className= {
            `fade modal ${mostrar ? "show modal-show" : ""}`} 
            tabIndex={"-1"}
        >
            <div className={`modal-dialog ${mostrar ? "show" : ""}`}
            >
                <div className="modal-content">
                    <div className="modal-header">{titulo}</div>
                    <div className="modal-body"
                        style={{whiteSpace:"pre-line", wordBreak:"break-word"}}
                    >
                    <div className="container">
                        {children}
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-eva-secondary"
                            onClick={cerrar}
                            {...props}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Modal