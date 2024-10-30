const padding = (fecha) => {
    let cadena = "";
    if ( typeof fecha === "number" ){
        cadena =  String(fecha);
    }
    if ( typeof fecha === "string" ){
        cadena = fecha;
    }
    return cadena.padStart(2, "0");
}

export const obtenerDia = (fecha="") => {
    return new Date(fecha).getUTCDay();
}

export const obtenerFechaCadena = (fecha) =>{
    const dia = padding(fecha.getUTCDate());
    const mes = padding(fecha.getUTCMonth() + 1);
    const anio = fecha.getUTCFullYear();
    return `${dia}-${mes}-${anio}`;
}

export const obtenerSemanaActual = () => {
    const actual = new Date();
    const fecha = actual.getDate();
    const dia = actual.getDay();

    const primerDia = new Date(actual.setDate(fecha - dia ));
    const ultimoDia = new Date(actual.setDate(primerDia.getDate() + 5));
    /* const primerDia = new Date(actual.setDate(fecha - dia + (dia === 0 ? -6: 1)));
    const ultimoDia = new Date(actual.setDate(fecha - dia + 7)); */

    return { primerDia: primerDia, ultimoDia: ultimoDia }
}

export const obtenerFechaActual = () => {
    const actual = new Date();
    const dia = padding(actual.getDate());
    const mes = padding(actual.getMonth() + 1);
    const anio = actual.getFullYear();
    return `${anio}-${mes}-${dia}`;
}