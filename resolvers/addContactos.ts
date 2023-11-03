//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const addContacto = async(req:Request, res:Response) => {
    try{
        const {dni, nombre, apellido1, apellido2, email, codigoPostal, iso} = req.body;

        if(!dni || !nombre || !apellido1 || !apellido2 || !email || !codigoPostal || !iso){
            res.status(500).send("Faltan datos");
            return; 
        }

        const yaExiste = await ContactoModel.findOne({dni}).exec();
        if(yaExiste){
            res.status(400).send("Ya existe un contacto con ese DNI");
            return; 
        }

        const nuevoContacto = new ContactoModel({dni, nombre, apellido1, apellido2, email, codigoPostal, iso});
        await nuevoContacto.save();
        res.status(200).json(nuevoContacto);
    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default addContacto;