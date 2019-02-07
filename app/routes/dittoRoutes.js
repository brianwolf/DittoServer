module.exports = app => {

    const urlBase = '/dittos'

    app.get(urlBase, (req, res) => {
        res.status(200).send('todos los dittos')
    })
}