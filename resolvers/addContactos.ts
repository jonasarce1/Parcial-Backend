//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

import getCapital from "../apis/getCapital.ts";
import getCiudad from "../apis/getCiudad.ts";
import getMeteo from "../apis/getMeteo.ts";
import getPais from "../apis/getPais.ts";
import getRegion from "../apis/getRegion.ts";
import getTimezone from "../apis/getTimezone.ts";

const addContacto = async(req:Request, res:Response) => {
    try{
        const {dni, nombre, apellido1, apellido2, email, codigoPostal, iso} = req.body;

        if(!dni || !nombre || !apellido1 || !apellido2 || !email || !codigoPostal || !iso){
            res.status(500).send("Faltan datos");
            return; 
        }

        if(iso.length !== 2){
            res.status(400).send("El iso code debe tener 2 caracteres");
            return; 
        }

        if(codigoPostal.length !== 5 && codigoPostal.length !== 6){
            res.status(400).send("El codigo postal debe tener 5 o 6 caracteres");
            return; 
        }

        const yaExiste = await ContactoModel.findOne({dni}).exec();
        if(yaExiste){
            res.status(400).send("Ya existe un contacto con ese DNI");
            return; 
        }

        const ciudad = await getCiudad(iso, codigoPostal);

        const capital = await getCapital(iso);

        const pais = await getPais(iso);

        const region = await getRegion(iso);
        
        const datetime = await getTimezone(region, capital);

        const condicionMeteo = await getMeteo(ciudad);

        const nuevoContacto = new ContactoModel({
            dni,
            nombre,
            apellido1,
            apellido2,
            email,
            codigoPostal,
            iso,
            pais,
            ciudad,
            datetime,
            condicionMeteo
        });

        await nuevoContacto.save();
        res.status(200).json(nuevoContacto);
    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default addContacto;