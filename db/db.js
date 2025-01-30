import mongoose from 'mongoose';
import { mensajes } from '../libs/mensajes.js';
export async function conectarbd(){
    try{
        const conexionBD = await mongoose.connect("mongodb://localhost:27017/ti01")
        return mensajes(200, "Conexion correcta");
    }catch (error){
        return mensajes(400, 'error al conectarse a la BD',error);
    }
    
}