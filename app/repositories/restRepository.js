const { DittoRestModel, FuncionRestModel } = require('../repositories/schemas/restSchemas')

const getDittosRests = function (filtros = {}) {

    let dittosRest = []
    try {
        dittosRest = DittoRestModel.find(filtros).exec()

    } catch (error) {
        console.error(error)
        throw error
    }
    return dittosRest
}

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

module.exports = { getDittosRests, getFuncionesRests }