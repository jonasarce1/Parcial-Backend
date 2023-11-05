//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

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

        res.status(200).send(contacto);
    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default getContactosDni;