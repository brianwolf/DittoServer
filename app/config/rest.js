import bodyParser from 'body-parser';
import http from "http-status-codes";
import { AppException } from '../models/errores.js';
import { getLogger } from './logger.js';

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

/**
 * Configura el server de express agregandole parametros,
 * sirve para la **app** y **routes** de express 
 * 
 * @param {*} app 
 */
export function configrarExpress(app) {
    app.use(urlencodedParser)
    app.use(jsonParser)
    app.use(errorHandler)
}

/**
 * ErrorHandler para express
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function errorHandler(err, req, res, next) {

    if (err instanceof AppException) {

        getLogger().warn(err.respuesta())
        res.status(err.http()).send(err.respuesta());
        return
    }

    getLogger().error(err)
    res.status(http.INTERNAL_SERVER_ERROR).send();
}
