const getTimezone = async(region:string, ciudad:string) => {
    const BASE_URL = "http://worldtimeapi.org/api/timezone";
    const url = `${BASE_URL}/${region}/${ciudad}`;

    const data = await fetch(url);

    if(data.status != 200){
        throw new Error("No se ha podido obtener informacion sobre la timezone en la API");
    }

    const json = await data.json();

    return json.datetime;
}

export default getTimezone;