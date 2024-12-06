const PaginaPrincipal = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col text-center">
                    <h2>Bienvenido a Proyecto EVA</h2>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h4 className="border border-eva-dark p-3">
                        Proyecto EVA es una aplicación web para ayudar en el
                        proceso de evaluación basada en proyectos.
                    </h4>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="border border-eva-dark p-3">
                        <h4>Tecnologías utilizadas</h4>
                        <div className="d-flex align-items-baseline gap-4 justify-content-center">
                            <img
                                src="react.webp"
                                alt="react"
                                style={{ maxWidth: "64px", height:"auto"}}
                            />
                            <img
                                src="laravel.webp"
                                alt="laravel"
                                style={{ maxWidth: "70px", height:"auto"}}
                            />
                            <img
                                src="php.webp"
                                alt="php"
                                style={{ maxWidth: "70px", height:"auto"}}
                            />
                            <img
                                src="postgres.webp"
                                alt="postgres"
                                style={{ maxWidth: "70px", height:"auto"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
