import { TarjetaEmpresa } from "../componentes/Tarjetas";

const Empresas = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="fw-bold text-center">Empresas</h2>
                </div>
            </div>
            <div className="row">
                <div className="card-group">
                    <TarjetaEmpresa />
                    <TarjetaEmpresa />
                    <TarjetaEmpresa />
                    <TarjetaEmpresa />
                    <TarjetaEmpresa />
                </div>
            </div>
        </div>
    );
}

export default Empresas;