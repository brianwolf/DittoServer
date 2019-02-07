const db = require('../../server').db

exports.todosLosDittos = next => {

    var dittos = db.find()
    return dittos
}
