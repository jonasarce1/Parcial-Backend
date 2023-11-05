//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getContactos = async(_req:Request, res:Response) => {
    try{
        const contactos = await ContactoModel.find({}).exec();
        if(!contactos){
            res.status(404).send("No hay ningun contacto");
            return;
        }

        res.status(200).send(contactos.map(({dni, nombre, apellido1, apellido2}) => ({dni, nombre, apellido1, apellido2})));
        
    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default getContactos;