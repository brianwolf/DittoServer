const mongoRepository = require('../repositories/mongoRepository.js')

const getUsuariosPorNick = function (nombre) {
    return mongoRepository.getUSuarios(nombre)
}