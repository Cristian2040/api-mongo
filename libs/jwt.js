import jwt from "jsonwebtoken";
import 'dotenv/config';
import { mensajes } from "./mensajes.js";
export function crearCookie(dato) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            dato,
            process.env.SECRET_TOKEN,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    reject(mensajes(400, "Error al generar el token"));
                }
                resolve(token);
            }
        );
    });
}