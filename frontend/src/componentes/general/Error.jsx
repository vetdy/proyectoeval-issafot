
const Error = () => {
    return(
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

export default Error