import { Router } from "express";
import { register } from "../db/usuariosDB.js";
import User from "../models/usuarioModelos.js";

const router = Router();

// Ruta para el registro
router.post("/registro", async (req, res) => {
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

// Ruta para el inicio de sesión
router.post("/inicioSesion", (req, res) => {
    res.json("Estás en inicio de sesión");
});

// Ruta para usuarios logueados
router.get("/usuariosLogueados", (req, res) => {
    res.json({ message: "Solo usuarios y administradores" });
});

// Ruta pública
router.get("/Libre", (req, res) => {
    res.json({ message: "Aquí puedes entrar sin estar logueado" });
});

// Nuevas rutas para los usuarios
// Mostrar todos los usuarios
router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
});

// Buscar usuario por ID
router.get("/usuarios/:id", async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuario" });
    }
});

// Borrar usuario por ID
router.delete("/usuarios/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Usuario borrado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al borrar usuario" });
    }
});

// Actualizar usuario por ID
router.put("/usuarios/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }
});

export default router;
