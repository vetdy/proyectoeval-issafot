export const longitud = (cadena="", n=0, m=0) =>{
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

export const alfanumerico = (cadena="") =>{
    return /^[\p{L}\d]+( [\p{L}\d]+)*$/u.test(cadena);
}

export const alfabetico = (cadena="") => {
    return /^[\p{L}]+( [\p{L}]+)*$/u.test(cadena);
}

export const numerico = (cadena="") => {
    return /^\d+$/.test(cadena);
}

export const correo = (correo="") =>{
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo);
}

export const archivo = (archivo) => {
    if(typeof archivo === "object" && archivo !== null && archivo instanceof File){
        return true;
    }
    return false;
}

export const nombreEmpresa = (nombre = "", n=0, m=0) =>{
    let error = "";

    const nom = nombre.trim();

    if (! longitud(nom, n, m) ){
        error = `Longitud debe ser entre ${n} y ${m} caracteres.`;
    }
    else if(! alfanumerico(nom) ){
        error = "Letras y numeros. Un espacio entre palabras.";
    }
    return error;
}

export const telefonoEmpresa = (telefono = "", n=7, m=12) =>{
    let error = "";

    if (! longitud(telefono, n, m) ){
        error = `Longitud debe ser entre ${n} y ${m} caracteres.`;
    }
    else if(! numerico(telefono)){
        error = "Solo se admite numeros sin espacios.";
    }
    return error;
}

export const correoEmpresa = (email = "") =>{
    let error = "";

    if(! correo(email)){
        error = "Ingresa un correo (ej. ejemplo@gmail.com)";
    }
    return error;
}

export const imagenEmpresa = (imagen, formatos=[], peso=0) => {
    let error = "";

    if(! archivo(imagen) ){
        error = "Seleciona un Archivo.";
    }
    else if(! formatos.includes(imagen.type) ){
        error = "Formato de imagen: .jpg, .png";
    }
    else if(imagen.size > peso){
        error = `La imagen es de maximo ${peso / 1048576 }mb.`;
    } 
    return error;
}