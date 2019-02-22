const restService = require('../services/restService');
const errores = require('../models/errores')
const { DittoRest, FuncionRest } = require('../models/modelosRest')

module.exports = function (app) {

    const urlBase = '/rest'

    app.route(urlBase + '/funciones')
        .get(getFuncionesJson)
        .post(crearFuncionPorJson)
        .delete(noImplementado)
        .put(noImplementado)


    app.route(urlBase + '/dittos')
        .post(crearDittoPorJson)
        .get(getDittosJson)
        .delete(noImplementado)
        .put(noImplementado)

    app.route(/.*/)
        .get(ejecutarDitto)
        .post(ejecutarDitto)
        .put(ejecutarDitto)
        .patch(ejecutarDitto)
        .delete(ejecutarDitto)


    function crearFuncionPorJson(req, res) {

        restService.crearFuncionPorJson(req.body)
            .then(() => {
                res.status(201).send()
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function getFuncionesJson(req, res) {

        restService.getFuncionesJson(req.query)
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

    function crearDittoPorJson(req, res) {

        restService.crearDittoPorJson(req.body)
            .then(() => {
                res.status(201).send()
            })
            .catch(e => {
                errores.crearRespuestaRest(e, res)
            })
    }

    function getDittosJson(req, res) {

        restService.getDittosJson(req.query, res)
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

        let respuesta = {
            "url": req.path,
            "method": req.method,
            "query": req.query,
            "path": req.params
        }
        res.status(200).send(respuesta)
    }

}