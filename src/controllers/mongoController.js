var app = express()

const mongoService = require('../services/mongoService.js')

app.get('/mongo/users/:id', (req, res) => {
    res.status(200).send('Hola mundo redondo...!!!')
})