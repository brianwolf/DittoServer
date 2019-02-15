const restService = require('../services/restService');
const errores = require('../models/errores')
const repository = require('../repositories/restRepository')

module.exports = function (app) {

    const urlBase = '/rest'

    app.get(urlBase + '/funciones', noImplementado)
    app.post(urlBase + '/funciones', obtenerFunciones)

    app.get(urlBase + '/dittos', noImplementado)
    app.post(urlBase + '/dittos', noImplementado)

    function obtenerFunciones(req, res) {
        repository.crearFuncion(req.body)
            .then(respuesta => {
                res.status(201).send(respuesta)
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function noImplementado(req, res) {
        res.status(501).send()
    }
}