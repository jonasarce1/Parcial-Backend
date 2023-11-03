const getPais = async(iso:string) => {
    const BASE_URL = "https://restcountries.com/v3.1/alpha";

    const url = `${BASE_URL}/${iso}`;

    const data = await fetch(url);

    if(data.status != 200){
        throw new Error("No se ha podido obtener informacion sobre la region en la API");
    }

    const json = await data.json();

    return json[0].name.common;
}

export default getPais;