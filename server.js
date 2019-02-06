var express = require('express')
var http = require('http')
var app = express()

var config = require('./config/desa.json')


app.get('/', (req, res) => {
    res.status(200).send("Hola mundo redondo...!!!")
})

http.createServer(app).listen(config.servidor.puerto, () => {
    console.log(`Servidor en http://${config.servidor.host}:${config.servidor.puerto}/`);
});