import logo from "/logo.png";

const TarjetaEmpresa = () => {
    return (
        <div className="card text-center" style={{width: "16rem", maxWidth: "16rem"}}>
            <img className="card-img-top p-4" src={logo} alt="Card image cap" />
            <div className="card-body">
                <p className="card-text">ISSA Soft</p>
                <p className="card-text text-muted">ISSA Soft</p>
            </div>
        </div>
    );
}

export default TarjetaEmpresa