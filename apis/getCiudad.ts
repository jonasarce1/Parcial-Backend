const getCiudad = async(iso:string, codigoPostal:string) => {
    const BASE_URL = "https://zip-api.eu/api/v1/info";
    const url = `${BASE_URL}/${iso}-${codigoPostal}`;

    //const url = `${BASE_URL}/${contacto.iso}-${contacto.codigoPostal}`;

    const data = await fetch(url);

    if(data.status != 200){
        throw new Error("No se ha podido obtener la informacion de ciudad la API");
    }

    const json = await data.json();

    return json.place_name;
}

export default getCiudad;