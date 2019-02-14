const dittoService = require('../services/dittoService');
const { ErrorAplicacion, CodigosHttp } = require('../models/errores')

module.exports = app => {

    const urlBase = '/dittos'

    app.get(urlBase, (req, res) => {
        try {
            let dittos = dittoService.todosLosDittos()
            if (!dittos) {
                res.status(204).send()
            }
            res.status(200).send(dittos)

        } catch (error) {
            if (error instanceof ErrorAplicacion) {
                res.status(error.getCodigoHttp()).send(error.crearRespuestaRest())
            }

            console.error(error);
            res.status(500).send()
        }
    })
}