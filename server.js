var express = require('express')
var http = require('http')
var app = express()
var MongoClient = require('mongodb').MongoClient

// ------------------------------------
// ARCHIVO DE CONFIGURACION
// ------------------------------------
const config = require('./app/config/desa.json')


// ------------------------------------
// BASE DE DATOS
// ------------------------------------
var option = { useNewUrlParser: true }
const dbo = MongoClient.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.puerto}`, option, (err, coneccion) => {

    if (err) throw err
    return coneccion.db(config.db.mongo.base)
})


// ------------------------------------
// RUTAS
// ------------------------------------
const fs = require('fs');
const pathDeLasRutas = './app/routes/'

fs.readdirSync(pathDeLasRutas).forEach(archivo => {

    var nombreArchivo = archivo.substr(0, archivo.indexOf('.'))
    var rutaAExportar = pathDeLasRutas + nombreArchivo
    console.log('ruta exportada -> ' + rutaAExportar)

    require(rutaAExportar)(app);
});


// ------------------------------------
// SERVIDOR
// ------------------------------------
app.get('/', (req, res) => {
    res.status(200).send('Hola mundo redondo...!!!')
})

http.createServer(app).listen(config.servidor.puerto, () => {
    console.log(`\nServidor escuchando en http://${config.servidor.host}:${config.servidor.puerto}/`)
})
