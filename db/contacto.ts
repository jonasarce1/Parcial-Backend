import mongoose from "npm:mongoose@7.6.3"; 
import {Contacto} from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema({
    dni:{type:String, required:true, unique:true},
    nombre:{type:String, required:true},
    apellido1:{type:String, required:true},
    apellido2:{type:String, required:true},
    email:{type:String, required:true},
    codigoPostal:{type:String, required:true},
    iso:{type:String, required:true},
    pais:{type:String, required:false},
    ciudad:{type:String, required:false},
    datetime:{type:String, required:false},
    condicionMeteo:{type:String, required:false}
})

type ContactoModelType = mongoose.Document & Omit<Contacto, "id">

export default mongoose.model<ContactoModelType>("Contacto", contactoSchema)