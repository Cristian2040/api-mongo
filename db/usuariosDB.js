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

// Nuevas funciones para gestionar usuarios
// Mostrar todos los usuarios
export const obtenerTodosLosUsuarios = async () => {
    try {
        const users = await User.find();
        return mensajes(200, "Usuarios obtenidos correctamente", users);
    } catch (error) {
        return mensajes(400, "Error al obtener usuarios", error);
    }
}

// Buscar usuario por ID
export const obtenerUsuarioPorId = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) return mensajes(404, "Usuario no encontrado");
        return mensajes(200, "Usuario encontrado", user);
    } catch (error) {
        return mensajes(400, "Error al buscar usuario", error);
    }
}

// Borrar usuario por ID
export const borrarUsuarioPorId = async (id) => {
    try {
        await User.findByIdAndDelete(id);
        return mensajes(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensajes(400, "Error al borrar usuario", error);
    }
}

// Actualizar usuario por ID
export const actualizarUsuarioPorId = async (id, data) => {
    try {
        await User.findByIdAndUpdate(id, data);
        return mensajes(200, "Usuario actualizado correctamente");
    } catch (error) {
        return mensajes(400, "Error al actualizar usuario", error);
    }
}

export const login = async ({ username, password }) => {

}