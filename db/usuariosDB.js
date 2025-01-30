import User from "../models/usuarioModelos.js";
import { encriptarPassword, validarPassword } from "../middlewares/funcionesPassword.js";
import { mensajes } from "../libs/mensajes.js";
import { crearCookie } from "../libs/jwt.js";

export const register = async ({ username, email, password }) => {
    try {
        const usuarioDuplicado = await User.findOne ({ username });
        const emailDuplicado = await User.findOne ({ email });
        if (usuarioDuplicado || emailDuplicado) {
            return mensajes(400, "El usuario ya existe");
        }
        const { salt, hash } = encriptarPassword(password);
        const dataUser = new User({ username, email, password: hash, salt });
        const respuestaMongo = await dataUser.save();
        console.log(respuestaMongo);
        
        const token = await crearCookie({id:respuestaMongo._id});
        return mensajes (200, "Usuario registrado correctamente","",token);
    } catch (error) {
        return mensajes(400, "error al registrar al usuario",error)
    }
}

export const login = async ({ username, password }) => {

}