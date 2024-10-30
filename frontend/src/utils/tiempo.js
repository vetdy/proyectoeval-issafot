
export const obtenerDia = (fecha="") => {
    return new Date(fecha).getUTCDay();
}

export const obtenerFechaCadena = (fecha) =>{
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1;
    const anio = fecha.getUTCFullYear();
    return `${dia}-${mes}-${anio}`;
}

export const obtenerSemanaActual = () => {
    const actual = new Date();
    const fecha = actual.getDate();
    const dia = actual.getDay();

    const primerDia = new Date(actual.setDate(fecha - dia + (dia === 0 ? -6: 1)));
    const ultimoDia = new Date(actual.setDate(fecha - dia + 7));

    return { primerDia: primerDia, ultimoDia: ultimoDia }
}

export const obtenerFechaActual = () => {
    const actual = new Date();
    const dia = String(actual.getDate()).padStart(2,0);
    const mes = String(actual.getMonth() + 1).padStart(2,0);
    const anio = actual.getFullYear();
    return `${anio}-${mes}-${dia}`;
}