import express from 'express';
import { mapa, no_mostrar } from "../config/MapaVariables.js";
import { get } from "../config/variables.js";

export const rutaBase = ''

export const router = express.Router();
export default () => router


router.get('/variables', obtenerVariables)

/**
 * Devuelve las variables de ambiente cargadas en el proyecto
 * que no esten en la lista de **no_mostrar**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function obtenerVariables(req, res) {

    let mapaVariables = {}

    Object.keys(mapa)
        .filter(v => no_mostrar.some(nm => nm != v))
        .map(v => mapaVariables[v] = get(v))

    res.status(200).send(mapaVariables)
}

