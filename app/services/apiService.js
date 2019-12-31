const repository = require('../repositories/restRepository')
const errores = require('../models/errores')

/**
 * Crea una nueva funcion en la BD
 * 
 * @param {*} funcionJson 
 */
export async function crearFuncion(funcionJson) {
    return repository.crearFuncion(funcionJson)
}

/**
 * Obtiene todas las funciones de la BD
 * Es posible pasarle filtros a la busqueda
 * 
 * @param {*} filtros 
 */
export async function sgetFunciones(filtros) {
    return await repository.getFunciones(filtros)
}


/**
 * Crea un nuevo ditto mediante un Json
 * donde en lugar de pasarle la id de la funcion se le pasa el nombre
 * de la misma 
 * 
 * @param {*} funcionJson 
 */
export async function crearDitto(dittoJson) {

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
export async function getDittos(filtros) {

    let dittos = await repository.getDittos(filtros)

    for (const ditto of dittos) {
        ditto.funcion = await repository.getFuncionPorId(ditto.funcion)
    }

    return dittos
}

// /**
//  * 
//  * @param {*} tipo 
//  * @param {*} require 
//  * @param {*} response 
//  */
// export async function ejecutarDitto(require, response) {

//     let tipo = require.method
//     let url = require.path

//     let ditto = await repository.getDitto({ 'rest': { 'url': url, 'tipo': tipo } })
//     if (!ditto) {
//         throw errores.ErrorAplicacion(`No se encuentra un dito que responda a ${url}`, 'DITO_NO_ENCONTRADO')
//     }

//     return await ditto.ejecutarMock(require, response)
// }
