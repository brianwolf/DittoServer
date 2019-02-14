const repository = require('../repositories/restRepository')

const todosLosDittos = function () {

    let dittos = repository.getDittosRests()
    return dittos
}

module.exports = { todosLosDittos }