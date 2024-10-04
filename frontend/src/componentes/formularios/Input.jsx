
function Input({name="", ...props}){
    return(
        <input className="form-control" 
            key={name} 
            name={name}
            {...props}
        ></input>
    );
}

export default Input