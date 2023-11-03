//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const deleteContacto = async(req:Request, res:Response) => {
    try{
        const dni = req.params.dni;

        if(!dni){
            res.status(400).send("Faltan datos");
            return; 
        }

        const yaExiste = await ContactoModel.findOne({dni}).exec();
        if(!yaExiste){
            res.status(404).send("No existe un contacto con ese id");
            return;
        }

        

    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}