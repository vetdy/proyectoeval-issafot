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