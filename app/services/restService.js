const repository = require('../repositories/restRepository')
const errores = require('../models/errores')

/**
 * Crea una nueva funcion en la DB
 * 
 * @param {*} funcionJson 
 */
const crearFuncionPorJson = function (funcionJson) {
    return repository.crearFuncionPorJson(funcionJson)
}

/**
 * Obtiene todas las funciones de la DB
 * Es posible pasarle filtros para la busqueda
 * 
 * @param {*} filtros 
 */
const getFuncionesJson = function (filtros) {
    return repository.getFuncionesJson(filtros)
}

/**
 * Crea una nueva funcion en la DB
 * 
 * @param {*} funcionJson 
 */
const crearDittoPorJson = function (dittoJson) {

    

    return repository.crearDittoPorJson(dittoJson)
}

/**
 * Obtiene todas las funciones de la DB
 * Es posible pasarle filtros para la busqueda
 * 
 * @param {*} filtros 
 */
const getDittosJson = function (filtros) {
    return repository.getDittosJson(filtros)
}

module.exports = { crearFuncionPorJson, getFuncionesJson, crearDittoPorJson, getDittosJson }