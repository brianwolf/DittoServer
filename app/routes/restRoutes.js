const restService = require('../services/restService');
const errores = require('../models/errores')
const repository = require('../repositories/restRepository')

module.exports = function (app) {

    const urlBase = '/rest'

    app.post(urlBase + '/funciones', function (req, res) {
        repository.crearFuncion(req.body)
            .then(respuesta => {
                res.status(201).send(respuesta)
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    })


    app.post('/test', function (req, res) {
        if (!req.body) return res.sendStatus(400)
        res.send(req.body)
    })
}