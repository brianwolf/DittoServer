const restService = require('../services/restService');
const errores = require('../models/errores')
const { DittoRest, FuncionRest } = require('../models/modelosRest')

module.exports = function (app) {

    const urlBase = '/rest'

    app.route(urlBase + '/funciones')
        .get(getFunciones)
        .post(crearFuncion)
        .delete(noImplementado)
        .put(noImplementado)


    app.route(urlBase + '/dittos')
        .post(crearDitto)
        .get(getDittos)
        .delete(noImplementado)
        .put(noImplementado)

    app.route(/.*/)
        .get(ejecutarDitto)
        .post(ejecutarDitto)
        .put(ejecutarDitto)
        .patch(ejecutarDitto)
        .delete(ejecutarDitto)


    function crearFuncion(req, res) {

        restService.crearFuncion(req.body)
            .then(() => {
                res.status(201).send()
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function getFunciones(req, res) {

        restService.getFunciones(req.query)
            .then(respuesta => {
                if (!respuesta || respuesta.length == 0) {
                    res.status(204).send()
                }
                res.status(200).send(respuesta)
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function crearDitto(req, res) {

        restService.crearDitto(req.body)
            .then(() => {
                res.status(201).send()
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function getDittos(req, res) {

        restService.getDittos(req.query, res)
            .then(respuesta => {
                if (!respuesta || respuesta.length == 0) {
                    res.status(204).end()
                }
                res.status(200).json(respuesta)
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function noImplementado(req, res) {
        res.status(501).send()
    }

    function ejecutarDitto(req, res) {

        restService.ejecutarDitto(req, res)
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

}