const repository = require('../repositories/restRepository')
const errores = require('../models/errores')
const similarity = require('string-similarity');

/**
 * Crea una nueva funcion en la BD
 * 
 * @param {*} funcionJson 
 */
const crearFuncion = function (funcionJson) {
    return repository.crearFuncion(funcionJson)
}


/**
 * Obtiene todas las funciones de la BD
 * Es posible pasarle filtros a la busqueda
 * 
 * @param {*} filtros 
 */
const getFunciones = async function (filtros) {
    return await repository.getFunciones(filtros)
}


/**
 * Crea un nuevo ditto mediante un Json
 * donde en lugar de pasarle la id de la funcion se le pasa el nombre
 * de la misma 
 * 
 * @param {*} funcionJson 
 */
const crearDitto = async function (dittoJson) {

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
const getDittos = async function (filtros) {

    let dittos = await repository.getDittos(filtros)

    for (const ditto of dittos) {
        ditto.funcion = await repository.getFuncionPorId(ditto.funcion)
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

    let ditto = await repository.getDitto({ 'rest': { 'url': url, 'tipo': tipo } })
    if (!ditto) {
        ditto = await getDittoMasParecido(url, tipo)
    }

    return await ditto.ejecutarMock(require, response)
    // let respuesta = {
    //     "url": req.path,
    //     "method": req.method,
    //     "query": req.query,
    //     "path": req.params
    // }
}

/**
 * 
 * @param {*} url 
 * @param {*} tipo 
 */
const getDittoMasParecido = function (url, tipo) {
    return getDittos()[0]
}



module.exports = { crearFuncion, getFunciones, crearDitto, getDittos, ejecutarDitto }