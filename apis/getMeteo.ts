import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const getMeteo = async(ciudad:string) => {
    const BASE_URL = "http://api.weatherapi.com/v1";

    const API_KEY = env["API_KEY"] || Deno.env.get("API_KEY"); 

    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${ciudad}`;

    const data = await fetch(url);

    if(data.status !== 200){ 
        throw new Error("No se ha podido obtener la informacion de las condiciones meteorologicas de la API");
    }

    const json = await data.json(); 

    return json.current.condition.text;
}

export default getMeteo;