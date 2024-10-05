function longitud(cadena="", n=0, m=0){
    if (n < 1 || m < 1){
        return false;
    }
    if(n === m){
        return cadena.length === n;
    }
    if(n < m){
        return cadena.length >= n && cadena.length <= m;
    }
    return cadena.length >= m && cadena.length <= n;
}

function esAlfaNumerico(entrada=""){
    return /^[\p{L}\d]+( [\p{L}\d]+)*$/u.test(entrada);
}

function esAlfabetico(entrada=""){
    return /^[\p{L}]+( [\p{L}]+)*$/u.test(entrada);
}

function esNumerico(entrada=""){
    return /^\d+$/.test(entrada);
}

function esCorreo(correo=""){
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo);
}

const esArchivo = (archivo) => {
    if(typeof archivo === "object" && archivo !== null && archivo instanceof File){
        return true;
    }
    return false;
}

const nombreCortoEmpresa = (nombre = "") =>{
    let error = "";

    const nom = nombre.trim();

    if (! longitud(nom, 3, 12) ){
        error = "Longitud debe ser entre 3 y 12 caracteres.";
    }
    else if(! esAlfaNumerico(nom)){
        error = "Letras y numeros. Un espacio entre palabras.";
    }
    return error;
}

const nombreLargoEmpresa = (nombre = "") =>{
    let error = "";

    const nom = nombre.trim();

    if (! longitud(nom, 3, 32) ){
        error = "Longitud debe ser entre 3 y 32 caracteres.";
    }
    else if(! esAlfaNumerico(nom)){
        error = "Letras y numeros. Un espacio entre palabras.";
    }
    return error;
}

const telefono = (telefono = "") =>{
    let error = "";

    if(! esNumerico(telefono)){
        error = "Solo se admite numeros sin espacios.";
    }
    else if (! longitud(telefono, 7, 12) ){
        error = "Longitud debe ser entre 7 y 12 caracteres.";
    }
    return error;
}

const correo = (correo = "") =>{
    let error = "";

    if(! esCorreo(correo)){
        error = "Formato invalido de Correo.";
    }
    return error;
}

const imagen = (imagen, formatos=[], peso=0) => {
    let error = "";

    if(! esArchivo(imagen) ){
        error = "Seleciona un Archivo.";
    }
    else if(! formatos.includes(imagen.type) ){
        error = "Formato de imagen invalido.";
    }
    else if(imagen.size > peso){
        error = `La imagen es de maximo ${peso / 1048576 }mb.`;
    } 
    return error;
}

const validarEntrada = {
    longitud: longitud,
    esNumerico: esNumerico,
    esAlfabetico: esAlfabetico,
    esAlfaNumerico: esAlfaNumerico,
    esCorreo: esCorreo,
    esArchivo: esArchivo,
    nombreCortoEmpresa: nombreCortoEmpresa,
    nombreLargoEmpresa: nombreLargoEmpresa,
    telefono: telefono,
    correo: correo,
    imagen: imagen,
}

export default validarEntrada;