import BotonControl from "./BotonControl";

const leerTitulos = (datos = []) => {
    if (!datos.length) {
        return [];
    }
    if (typeof datos[0] === "string") {
        return datos;
    }
    return Object.keys(datos[0]);
};

/**
 * Genera un componente lista con los datos de la posición y llave indicados.
 * Genera tomado la posicion del json y su llave, el valor debe ser string[].
 * @param {Object<string,*>[]} datos El arreglo de datos en formato json.
 * @param {number} index La posicion en el arreglo de donde leer los datos.
 * @param {string} llave La llave o key del json donde esta el arreglo de string.
 * @param {string} pkey Una cadena para generar key unico del componente.
 * @param {function[]} handle Una funcion o arreglo de funciones para manejar eventos.
 * @returns El componente con la lista.
 */
const Lista = ({ datos = [], index = 0, llave = "", pkey = "", handle }) => {
    const arreglo = datos[index][llave];
    const olkey = `${pkey}-ol`;

    return (
        <ol key={olkey}>
            {arreglo.map((cad, i) => {
                return(
                    <li key={`${olkey}-${i}`}>{cad}</li>
                )
            })}
        </ol>
    );
};

const genBoton = ({cadena = "", index = 0, llave = "",  pkey="", botones, handle}) => {
    const palabras = cadena.split(botones);
    return(
        <>
            {palabras.map(p => {
                if(! p){
                    return;
                }
                if( botones.test(p) ){
                    const bkey = `${pkey}-${p}`;
                    return (
                        <BotonControl 
                            tipo={p}
                            key={bkey}
                        />
                    )
                }
                return <>{p}</>
            })}
        </>
    )
}

/**
 * Genera una tabla con los datos otorgados a la funcion.
 * @param {(Object<string,*>[]|[])} datos Los datos
 * @returns El componente Tabla con los datos
 */
const Tabla = ({ datos = [], children, handle }) => {
    const titulos = leerTitulos(datos);
    const botones = /(<detalle>|<agregar>|<editar>|<eliminar>)/;
    return (
        <div className="container-fluid ">
            <table className="table table-hover">
                <thead>
                    <tr>
                        {titulos.map((t) => {
                            return (
                                <th
                                    scope="col"
                                    key={`th-${t}`}
                                    className="bg-eva-secondary text-eva-light"
                                >
                                    {t}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {datos.length &&
                        typeof datos[0] !== "string" &&
                        datos.map((d, idx) => {
                            return (
                                <tr key={`f-${idx}`}>
                                    {Object.entries(d).map(([llave, valor]) => {
                                        const key = `f-${idx}-c${llave}`;
                                        if ( typeof valor === "string" ) {
                                            if( botones.test(valor) ){
                                                return (
                                                    <td key={key}>
                                                        {genBoton({
                                                            cadena:valor, 
                                                            index:idx,
                                                            llave, 
                                                            pkey:key,
                                                            botones
                                                        })}
                                                    </td>
                                                )
                                            }
                                            return <td key={key}>{valor}</td>;
                                        }
                                        if ( Array.isArray(valor) ) {
                                            const listakey = `${key}-lista`
                                            return (
                                                <td key={key}>
                                                    <Lista
                                                        pkey={listakey}
                                                        key={listakey}
                                                        datos={datos}
                                                        index={idx}
                                                        llave={llave}
                                                    />
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })
                    }
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;
