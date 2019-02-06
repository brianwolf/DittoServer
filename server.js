var express = require('express')
var http = require('http')
var app = express()
var MongoClient = require('mongodb').MongoClient

const config = require('./config/desa.json')

app.get('/', (req, res) => {
    res.status(200).send('Hola mundo redondo...!!!')
})

var option = { useNewUrlParser: true }
const dbo = MongoClient.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.puerto}`, option, (err, coneccion) => {

    if (err) throw err
    return coneccion.db(config.db.mongo.base)
})

http.createServer(app).listen(config.servidor.puerto, () => {
    console.log(`Servidor en http://${config.servidor.host}:${config.servidor.puerto}/`)
})

require('./src/controllers/mongoController')(app);
require('./src/repositories/mongoRepository')(dbo);