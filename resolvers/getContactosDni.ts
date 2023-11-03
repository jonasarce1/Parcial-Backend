//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

import getCiudad from "../apis/getCiudad.ts";
import getPais from "../apis/getPais.ts";
import getRegion from "../apis/getRegion.ts";
import getTimezone from "../apis/getTimezone.ts";
import getMeteo from "../apis/getMeteo.ts";

const getContactosDni = async(req:Request, res:Response) => {
    try{
        const dni = req.params.dni;

        if(!dni){
            res.status(400).send("Falta el dni");
            return;
        }

        const contacto = await ContactoModel.findOne({dni}).exec();

        if(!contacto){
            res.status(404).send("No se ha podido encontrar el contacto");
            return;
        }

        const ciudad = await getCiudad(contacto.iso, contacto.codigoPostal);

        const pais = await getPais(contacto.iso);

        const region = await getRegion(contacto.iso);
        
        const datetime = await getTimezone(region, ciudad);

        const condicionMeteo = await getMeteo(ciudad);

        res.status(200).send({
            dni: contacto.dni,
            nombre: contacto.nombre,
            apellido1: contacto.apellido1,
            apellido2: contacto.apellido2,
            codigoPostal: contacto.codigoPostal,
            pais,
            ciudad,
            datetime,
            condicionMeteo
        });

    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default getContactosDni;