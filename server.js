var express = require('express')
var http = require('http')
// var MongoClient = require('mongodb').MongoClient

const app = express()

// ------------------------------------
// ARCHIVO DE CONFIGURACION
// ------------------------------------
const config = require('./app/config/desa.json')


// ------------------------------------
// BASE DE DATOS
// ------------------------------------
var mongoose = require('mongoose');
var option = { useNewUrlParser: true }
mongoose.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.puerto}/${config.db.mongo.base}`, option, err => {

    if (err) throw err
    console.log(`Coneccion establecida con ${config.db.mongo.base}`)
})

exports.db = mongoose.connection

// ------------------------------------
// RUTAS
// ------------------------------------
const fs = require('fs')
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
