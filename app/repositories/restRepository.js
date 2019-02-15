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
 * 
 * @param {*} filtros 
 */
const getFuncionesRests = function (filtros = {}) {

    let dittosRest = []
    try {
        dittosRest = FuncionRestModel.find(filtros).exec()

    } catch (error) {
        console.error(error)
        throw error
    }
    return dittosRest
}


/**
 * Crea una funcion y devuelve la id
 * 
 * @param {*} funcionNueva 
 */
// const crearFuncion = function (funcionNueva) {

//     // funcionNueva._id = new mongoose.Types.ObjectId

//     modelo = new FuncionRestModel(funcionNueva)
//     modelo.save(function (error, fun) {
//         if (error) {
//             console.error("error al guardar la funcion", error);
//             Promise.reject(error)
//         }
//         return Promise.resolve(fun)
//     })
// }


const crearFuncion = function (funcionNueva) {

    funcionNueva._id = new mongoose.Types.ObjectId

    modelo = new FuncionRestModel(funcionNueva)
    return modelo.save()
        .then(() => {
            return { "id": funcionNueva._id }
        })
}


module.exports = { getDittosRests, crearDitto, getFuncionesRests, crearFuncion }