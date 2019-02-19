const repository = require('../repositories/restRepository')
const errores = require('../models/errores')
const { ObjectId } = require('mongoose').SchemaTypes

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
const getFuncionesJson = function (filtros) {
    return repository.getFuncionesJson(filtros)
}


/**
 * Obtiene una funcion por su id
 * 
 * @param {*} id 
 */
const getFuncionJsonPorId = function (id) {

    let idFinal = id
    if (typeof id == 'string') {
        idFinal = new ObjectId(id)
    }

    return repository.getFuncionesJson({ '_id': idFinal })
}


/**
 * Crea un nuevo ditto mediante un Json
 * donde en lugar de pasarle la id de la funcion se le pasa el nombre
 * de la misma 
 * 
 * @param {*} funcionJson 
 */
const crearDittoPorJson = function (dittoJson) {

    return getFuncionesJson({ 'nombre': dittoJson.nombreFuncion })
        .then(funciones => {

            let funcion = funciones[0]
            if (!funcion) {
                let mensaje = `La funcion con el nombre ${dittoJson.nombreFuncion} no existe`
                let codigo = errores.TiposError.FUNCION_NO_EXISTE

                throw new errores.ErrorAplicacion(mensaje, codigo)
            }

            dittoJson.funcion = funcion._id
            return repository.crearDittoPorJson(dittoJson)
        })
}


/**
 * Obtiene todas los dittos de la BD
 * Es posible pasarle filtros a la busqueda
 * 
 * @param {*} filtros 
 */
const getDittosJson = function (filtros) {

    return repository.getDittosJson(filtros)
        .then(dittos => {

            return dittos.map(ditto => {
                ditto.funcion = getFuncionJsonPorId(ditto.funcion)
                return ditto
            })
        })
}


/**
 * Obtiene un ditto por su id
 * 
 * @param {*} id 
 */
const getDittoJsonPorId = function (id) {

    let idFinal = typeof id == 'string' ? new ObjectId(id) : id
    return repository.getDittosJson({ '_id': idFinal })
}

module.exports = { crearFuncionPorJson, getFuncionesJson, getFuncionJsonPorId, crearDittoPorJson, getDittosJson, getDittoJsonPorId }