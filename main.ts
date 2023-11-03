import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getContactos from "./resolvers/getContactos.ts";
import getContactosDni from "./resolvers/getContactosDni.ts";
import addContacto from "./resolvers/addContactos.ts";
import updateContacto from "./resolvers/updateContactos.ts";
import deleteContacto from "./resolvers/deleteContacto.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //Obtenemos la variable de entorno MONGO_URL ya sea de .env o de las variables de entorno del sistema

if(!MONGO_URL){
  console.log("No se ha encontrado la variable de entorno MONGO_URL");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.get("/api/contactos", getContactos);
app.get("/api/contactos/:dni", getContactosDni);
app.post("/api/contactos", addContacto);
app.put("/api/contactos/:dni", updateContacto);
app.delete("/api/contactos/:dni", deleteContacto);

app.listen(3000, () => console.log("Servidor activo en puerto 3000"));