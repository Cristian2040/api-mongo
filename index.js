import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import usuariosRutas from "./routes/usuariosRutas.js";
import { conectarbd } from "./db/db.js"

const app = express();
const respuesta = conectarbd();
respuesta.then((value)=>{
    console.log(value);
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", usuariosRutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

