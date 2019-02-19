const restService = require('../services/restService');
const errores = require('../models/errores')
const { DittoRest, FuncionRest } = require('../models/modelosRest')

module.exports = function (app) {

    const urlBase = '/rest'

    app.route(urlBase + '/funciones')
        .get(getFuncionesJson)
        .post(crearDittoPorJson)
        .delete(noImplementado)
        .put(noImplementado)


    app.route(urlBase + '/dittos')
        .post(crearDittoPorJson)
        .get(getDittosJson)
        .delete(noImplementado)
        .put(noImplementado)

    // app.route(/.*fly$/)


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

        restService.getDittosJson(req.query)
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

    function noImplementado(req, res) {
        res.status(501).send()
    }
}