const mongoose = require("mongoose");

const { DittoRestModel, FuncionRestModel } = require('../repositories/schemas/restSchemas')
const { FuncionRest, DittoRest } = require('../models/modelosRest')

/**
 * Crea una funcion mediante un JSON y devuelve la id generada
 * 
 * @param {*} funcionJson 
 */
const crearFuncion = async function (funcionJson) {
    try {
        funcionJson._id = new mongoose.Types.ObjectId()

        await FuncionRestModel.save()
        return { "id": funcionJson._id }

    } catch (error) {
        console.error("Error en la carga de la funcion\n", error)
        throw error
    }
}


/**
 * Trae todas las funciones rest de la DB en formato Json (mismo formato que en la DB)
 * 
 * @param {*} filtros 
 */
const getFunciones = async function (filtros = {}) {
    try {
        let modelos = await FuncionRestModel.find(filtros).exec()

        return modelos.map(modelo => {
            return FuncionRest.crearPorJson(modelo)
        })

    } catch (error) {
        console.error(`Error en la obtencion de las funciones, los filtros fueron: ${filtros}`, error)
        throw error
    }
}


/**
 * Trae una la primera funcion que cumpla con los filtros que se pasan por parametro
 * 
 * @param {*} filtros 
 */
const getFuncion = async function (filtros = {}) {
    try {
        let modelo = await FuncionRestModel.findOne(filtros).exec()
        return FuncionRest.crearPorJson(modelo)

    } catch (error) {
        console.error(`Error en la obtencion de la funcion, los filtros fueron: ${filtros}`, error)
        throw error
    }
}


/**
 * Obtiene una funcion por su id
 * 
 * @param {*} id 
 */
const getFuncionPorId = async function (id) {
    try {
        let modelo = await FuncionRestModel.findById(id).exec()
        return FuncionRest.crearPorJson(modelo)

    } catch (error) {
        console.error(`Error en la obtencion de las funciones, los filtros fueron: ${filtros}`, error)
        throw error
    }
}


/**
 * Crea un Ditto mediante un JSON y devuelve la id generada
 * 
 * @param {*} dittoJson 
 */
const crearDitto = async function (dittoJson) {
    try {
        dittoJson._id = new mongoose.Types.ObjectId()

        await DittoRestModel.save()
        return { "id": dittoJson._id }

    } catch (error) {
        console.error(`Error en la creacion del Ditto, el objeto fue: ${dittoJson} \n`, error)
        throw error
    }
}


/**
 * Trae todas las funciones rest de la DB en formato Json (mismo formato que en la DB)
 * 
 * @param {*} filtros 
 */
const getDittos = async function (filtros = {}) {
    try {
        let modelos = await DittoRestModel.find(filtros).exec()

        return await modelos.map(modelo => {
            return DittoRest.crearPorJson(modelo)
        })

    } catch (error) {
        console.error(`Error en la obtencion de los dittos, los filtros fueron: ${filtros}`, error)
        throw error
    }
}


/**
 * Obtiene un ditto por su id
 * 
 * @param {*} id 
 */
const getDittoPorId = async function (id) {

    let idFinal = typeof id == 'string' ? new ObjectId(id) : id
    return await getDittosJson({ '_id': idFinal })
}


/**
 * Trae una la primera funcion que cumpla con los filtros que se pasan por parametro
 * 
 * @param {*} filtros 
 */
const getDitto = async function (filtros = {}) {
    try {
        let modelo = await DittoRestModel.findOne(filtros).exec()
        if (!modelo) {
            return null
        }

        let ditto = await DittoRest.crearPorJson(modelo)
        let funcion = await getFuncionPorId(ditto.funcion)
        
        ditto.funcion = funcion
        return ditto

    } catch (error) {
        console.error(`Error en la obtencion del Ditto, los filtros fueron: ${filtros}`, error)
        throw error
    }
}


module.exports = { crearFuncion, getFunciones, getFuncion, getFuncionPorId, crearDitto, getDittos, getDitto, getDittoPorId }