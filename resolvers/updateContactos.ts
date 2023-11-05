//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

import getCapital from "../apis/getCapital.ts";
import getCiudad from "../apis/getCiudad.ts";
import getMeteo from "../apis/getMeteo.ts";
import getPais from "../apis/getPais.ts";
import getRegion from "../apis/getRegion.ts";
import getTimezone from "../apis/getTimezone.ts";

const updateContacto = async(req:Request, res:Response) => {
    try{
        const dni = req.params.dni;
        const {nombre, apellido1, apellido2, email, codigoPostal, iso} = req.body;

        if(!dni){
            res.status(400).send("Falta el dni");
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


        const contacto = await ContactoModel.findOne({dni}).exec();

        if(!contacto){
            res.status(404).send("No existe un contacto con ese id");
            return;
        }

        if(nombre){
            contacto.nombre = nombre;
        }

        if(apellido1){
            contacto.apellido1 = apellido1;
        }

        if(apellido2){
            contacto.apellido2 = apellido2;
        }

        if(email){
            contacto.email = email;
        }

        if((codigoPostal && codigoPostal !== contacto.codigoPostal) || (iso && iso !== contacto.iso)){
            contacto.codigoPostal = codigoPostal || contacto.codigoPostal;
            contacto.iso = iso || contacto.iso;
            contacto.pais = await getPais(iso || contacto.iso);
            contacto.ciudad = await getCiudad(iso || contacto.iso, codigoPostal || contacto.codigoPostal);
            const region = await getRegion(iso || contacto.iso);
            const capital = await getCapital(iso || contacto.iso);
            contacto.datetime = await getTimezone(region, capital);
            if(contacto.ciudad){ 
                contacto.condicionMeteo = await getMeteo(contacto.ciudad)
            }
        }

        await contacto.save();

        res.status(200).json(contacto);

    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default updateContacto;