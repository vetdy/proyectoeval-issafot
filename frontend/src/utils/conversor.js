export const base64 = (archivo) => {
    const promise = new Promise ( (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.onerror = () => {
            reject( new Error("El archivo no se convirtio a BASE64") );
        }
    });
    return promise;
}

export const cadenaValoresJSON = (json) => {
    let cadena = "";

    console.log("DESDE CONV", json);
    console.log(json instanceof String);
    console.log(typeof json);

    if(typeof json === "string"){
        return json;
    }

    Object.entries(json).forEach(([k, v]) => {
        if( cadena ) cadena += "\n";
        if( Array.isArray(v) ){
            cadena += v.join("\n");
        }
        if( typeof v === "string" ){
            cadena += v;
        }
        if(v !== null && typeof v === "object" && 
            ! Array.isArray(v) && Object.keys(v).length
        ){
            cadena += "Objeto anidado";
        }
    });
    return cadena;
}