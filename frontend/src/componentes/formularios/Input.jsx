
function Input({name = "", error = "", ...props}){
    return(
        <div>
            <input className={`form-control ${error ? "is-invalid" : ""}`} 
                key={name} 
                name={name}
                {...props}
            ></input>
            <p className="mx-1 fw-bold small text-eva-danger">{error}</p>
        </div>
    );
}

export default Input