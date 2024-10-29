/* Date.prototype.GetFirstDayOfWeek = function() {
    return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() == 0 ? -6:1) )));
}
Date.prototype.GetLastDayOfWeek = function() {
    return (new Date(this.setDate(this.getDate() - this.getDay() +7)));
} */

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
/* 
var today = new Date();

alert(today.GetFirstDayOfWeek());

alert(today.GetLastDayOfWeek()); */