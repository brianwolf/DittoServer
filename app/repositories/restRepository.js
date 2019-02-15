const { DittoRestModel, FuncionRestModel } = require('../repositories/schemas/restSchemas')
const mongoose = require("mongoose");

/**
 * 
 * @param {*} filtros
 */
const getDittosRests = function (filtros = {}) {

    DittoRestModel.find(function (err, dittos) {
        if (err) {
            console.error("error al obtener los dittos", err);
            throw err
        }
        return dittos
    })
}


/**
 * 
 * @param {*} dittoNuevo
 */
const crearDitto = function (dittoNuevo) {

    // dittoNuevo._id = mongoose.

    modelo = new DittoRestModel(dittoNuevo)
    modelo.save(function (err, ditto) {
        if (err) {
            console.error("error al guardar el ditto", err);
            throw err
        }
        return ditto
    })
}


/**
 * Trae todas las funciones rest de la base
 * 
 * @param {*} filtros 
 */
const traerFuncionesRests = function (filtros = {}) {

    dittosRest = FuncionRestModel.find(filtros).exec()

}


/**
 * Crea una funcion y devuelve la id
 * 
 * @param {*} funcionNueva 
 */
const crearFuncion = function (funcionNueva) {

    funcionNueva._id = new mongoose.Types.ObjectId

    modelo = new FuncionRestModel(funcionNueva)
    return modelo.save()
        .then(() => {
            return { "id": funcionNueva._id }
        })
        .catch(e => {
            console.error("Error en la carga de la funcion\n", e)
            throw e
        })
}


module.exports = { getDittosRests, crearDitto, traerFuncionesRests, crearFuncion }