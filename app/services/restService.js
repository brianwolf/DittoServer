const repository = require('../repositories/restRepository')

const todosLosDittos = function () {

    let dittos = repository.getDittosRests()
    return dittos
}

const crearDitto = function (dittoNuevo) {

    let resultado = repository.crearDitto(dittoNuevo)
    return resultado
}


const crearFuncion = function (funcionNueva) {
    return repository.crearFuncion(funcionNueva)
}

module.exports = { todosLosDittos, crearDitto, crearFuncion }