const repository = require('../repositories/restRepository')
const errores = require('../models/errores')
const similarity = require('string-similarity');

/**
 * Crea una nueva funcion en la BD
 * 
 * @param {*} funcionJson 
 */
const crearFuncionPorJson = function (funcionJson) {
    return repository.crearFuncionPorJson(funcionJson)
}


/**
 * Obtiene todas las funciones de la BD
 * Es posible pasarle filtros a la busqueda
 * 
 * @param {*} filtros 
 */
const getFuncionesJson = async function (filtros) {
    return await repository.getFuncionesJson(filtros)
}


/**
 * Crea un nuevo ditto mediante un Json
 * donde en lugar de pasarle la id de la funcion se le pasa el nombre
 * de la misma 
 * 
 * @param {*} funcionJson 
 */
const crearDittoPorJson = async function (dittoJson) {

    let funcion = await repository.getFuncion({ 'nombre': dittoJson.nombreFuncion })
    if (!funcion) {

        let mensaje = `La funcion con el nombre ${dittoJson.nombreFuncion} no existe`
        let codigo = errores.TiposError.FUNCION_NO_EXISTE

        throw new errores.ErrorAplicacion(mensaje, codigo)
    }

    dittoJson.funcion = funcion._id
    return await repository.crearDittoPorJson(dittoJson)
}


/**
 * Obtiene todas los dittos de la BD
 * Es posible pasarle filtros a la busqueda
 * 
 * @param {*} filtros 
 */
const getDittosJson = async function (filtros) {

    let dittos = await repository.getDittosJson(filtros)

    for (const ditto of dittos) {
        ditto.funcion = await repository.getFuncionJsonPorId(ditto.funcion)
    }

    return dittos
}

/**
 * 
 * @param {*} tipo 
 * @param {*} require 
 * @param {*} response 
 */
const ejecutarDitto = async function (require, response) {

    let tipo = require.method
    let url = require.path

    let ditto = await getDittosJson({ 'rest.url': url, 'rest.tipo': tipo })[0]
    if (!ditto) {
        ditto = getDittoMasParecido(url, tipo)
    }

}

/**
 * 
 * @param {*} url 
 * @param {*} tipo 
 */
const getDittoMasParecido = function (url, tipo) {
    return getDittosJson()[0]
}



module.exports = { crearFuncionPorJson, getFuncionesJson, crearDittoPorJson, getDittosJson }