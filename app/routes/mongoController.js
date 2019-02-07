// const mongoService = require('../services/mongoService')

const urlBase = "/mongo"

module.exports = app => {

    app.get(urlBase + '/users/:name', (req, res) => {

        // usuario = mongoService.getUsuariosPorNick(req.params.name)
        usuario = { "asd": "ASD" }

        res.status(200).send(usuario)
    })
}