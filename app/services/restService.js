import { Respuesta } from "../models/modelosRest";

/**
 * 
 * @param {*} tipo 
 * @param {*} require 
 * @param {*} response 
 */
export async function ejecutarDitto(require, response) {

    let verbo = require.method
    let url = require.path

    let ditto = await repository.getDitto({ 'url': url, 'verbo': verbo })
    if (!ditto) {
        throw errores.ErrorAplicacion(`No se encuentra un dito que responda a ${url}`, 'DITO_NO_ENCONTRADO')
    }

    let respuesta = await ditto.ejecutarMock(require, response)
    if (!respuesta || !respuesta.esValido()) {

        // REVISAR !!!!!!!!!!!!!!!!!!!!!!
        return new Respuesta(500)
    }

    return respuesta
}
