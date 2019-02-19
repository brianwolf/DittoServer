const restService = require('../services/restService');
const errores = require('../models/errores')
const { DittoRest, FuncionRest } = require('../models/modelosRest')

module.exports = function (app) {

    const urlBase = '/rest'

    app.post(urlBase + '/funciones', crearFuncionPorJson)
    app.get(urlBase + '/funciones', getFuncionesJson)

    app.post(urlBase + '/dittos', crearDittoPorJson)
    app.get(urlBase + '/dittos', getDittosJson)


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