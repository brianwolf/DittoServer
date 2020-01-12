import express from 'express';
import { mapa, no_mostrar } from "../config/mapaVariables.js";
import * as vars from "../config/variables.js";
import { AppException } from "../models/errores.js";

export const rutaBase = ''
export const router = express.Router();

/**
 * Devuelve las variables de ambiente cargadas en el proyecto
 * que no esten en la lista de **no_mostrar**
 */
router.get('/variables', (req, res) => {

    let mapaVariables = {}

    Object.keys(mapa)
        .filter(v => no_mostrar.some(nm => nm != v))
        .map(v => mapaVariables[v] = vars.get(v))

    res.status(200).send(mapaVariables)
})

/**
 * Prueba de error handler para una **AppException**
 */
router.get('/errores', (req, res) => {
    throw new AppException('ERROR_PRUEBA', 'Error de prueba')
})

/**
 * Prueba de error handler para un **Error no controlado**
 */
router.get('/errores/500', (req, res) => {
    throw new Error('Se rompio todo :(')
})

