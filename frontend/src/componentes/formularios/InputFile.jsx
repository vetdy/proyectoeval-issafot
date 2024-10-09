const InputFile = ({
    name = "",
    texto = "Seleccionar Archivo",
    error = "",
    archivo = "",
    formatos = [],
    onChange,
}) => {
    const idInput = `input-file-id-${name}`;
    return (
        <div style={{ maxWidth: "100%" }}>
            <div className="container">
                <div className="row">
                    <div
                        className="col p-0"
                        style={{ maxWidth: "220px" }}
                    >
                        <label
                            className={`
                                input-group-text 
                                ${error ? "is-invalid" : ""}
                            `}
                            style={{ userSelect: "none", overflow: "hidden" }}
                            htmlFor={idInput}
                        >
                            {texto}
                        </label>
                    </div>
                    <div
                        className="col p-0"
                        style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            userSelect: "none",
                            maxWidth: "340px",
                        }}
                    >
                        <span
                            className={`form-control text-eva-info 
                                ${error ? "is-invalid" : ""}
                            `}
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                textWrap: "nowrap",
                                userSelect: "none",
                            }}
                        >
                            {archivo ? archivo : "Sin seleccionar."}
                        </span>
                    </div>
                    <input
                        id={idInput}
                        className="form-control visually-hidden"
                        type="file"
                        name={name}
                        key={name}
                        onChange={onChange}
                        accept={formatos.join()}
                    />
                </div>
            </div>
            <p className="mx-1 fw-bold small text-eva-danger">{error}</p>
        </div>
    );
};

export default InputFile;
