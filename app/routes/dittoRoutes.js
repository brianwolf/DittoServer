const dittoService = require('../services/dittoService');

module.exports = app => {

    const urlBase = '/dittos'

    app.get(urlBase, (req, res) => {
        try {
            var dittos = dittoService.todosLosDittos()
            if (!dittos) {
                res.status(204).send()
            }
            res.status(200).send(dittos)

        } catch (error) {
            res.status(500).send()
        }
    })
}