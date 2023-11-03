//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const updateContacto = async(req:Request, res:Response) => {
    try{
        const dni = req.params.dni;
        const {nombre, apellido1, apellido2, email, codigoPostal, iso} = req.body;

        if(!dni){
            res.status(400).send("Falta el dni");
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

        if(codigoPostal){
            contacto.codigoPostal = codigoPostal;
        }

        if(iso){
            contacto.iso = iso;
        }

        await contacto.save();

        res.status(200).json(contacto);

    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default updateContacto;