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

        const contactoDelete = await ContactoModel.findOneAndDelete({dni}).exec();
        if(!contactoDelete){
            res.status(404).send("No existe un contacto con ese id");
            return;
        }

        res.status(200).json("Contacto borrado correctamente"); 
    }catch(error){
        res.status(500).send(error.message); //status 500 es error del servidor
        return;
    }
}

export default deleteContacto;