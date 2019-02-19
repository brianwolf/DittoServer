const mongoose = require("mongoose");

const { DittoRestModel, FuncionRestModel } = require('../repositories/schemas/restSchemas')
const { FuncionRest } = require('../models/modelosRest')

/**
 * Crea una funcion mediante un JSON y devuelve la id generada
 * 
 * @param {*} funcionJson 
 */
const crearFuncionPorJson = function (funcionJson) {

    funcionJson._id = new mongoose.Types.ObjectId()

    modelo = new FuncionRestModel(funcionJson)
    return modelo.save()
        .then(() => {
            return { "id": funcionJson._id }
        })
        .catch(e => {
            console.error("Error en la carga de la funcion\n", e)
            throw e
        })
}

/**
 * Trae todas las funciones rest de la DB en formato Json (mismo formato que en la DB)
 * 
 * @param {*} filtros 
 */
const getFuncionesJson = function (filtros = {}) {

    return FuncionRestModel.find(filtros).exec()
        .then(resultado => {
            return resultado
        })
        .catch(e => {
            console.error(`Error en la obtencion de las funciones, los filtros fueron: ${filtros}`, e)
            throw e
        })
}



/**
 * Crea un Ditto mediante un JSON y devuelve la id generada
 * 
 * @param {*} dittoJson 
 */
const crearDittoPorJson = function (dittoJson) {

    dittoJson._id = new mongoose.Types.ObjectId()

    modelo = new DittoRestModel(dittoJson)
    return modelo.save()
        .then(() => {
            return { "id": dittoJson._id }
        })
        .catch(e => {
            console.error("Error en la carga de la funcion\n", e)
            throw e
        })
}

/**
 * Trae todas las funciones rest de la DB en formato Json (mismo formato que en la DB)
 * 
 * @param {*} filtros 
 */
const getDittosJson = function (filtros = {}) {

    return DittoRestModel.find(filtros).exec()
        .then(resultado => {
            return resultado
        })
        .catch(e => {
            console.error(`Error en la obtencion de las funciones, los filtros fueron: ${filtros}`, e)
            throw e
        })
}


module.exports = { crearFuncionPorJson, getFuncionesJson, crearDittoPorJson, getDittosJson }