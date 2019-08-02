import express from 'express';
import http from 'http';

const app = express()

// ------------------------------------
// ARCHIVO DE CONFIGURACION
// ------------------------------------
import config from './app/config/desa.json'


// ------------------------------------
// BASE DE DATOS
// ------------------------------------
import mongoose from 'mongoose';
const option = { useNewUrlParser: true }

mongoose.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.puerto}/${config.db.mongo.base}`, option, err => {
    if (err) throw err
    console.log(`Coneccion establecida con ${config.db.mongo.base}`)
})
// exports.db = mongoose.connection


// ------------------------------------
// JSON
// ------------------------------------
import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

app.use(urlencodedParser)
app.use(jsonParser)


// ------------------------------------
// RUTAS
// ------------------------------------
import fs from 'fs'
const pathDeLasRutas = './app/routes'

fs.readdirSync(pathDeLasRutas).forEach(async archivo => {

    var rutaAExportar = pathDeLasRutas + '/' + archivo
    console.log('ruta exportada -> ' + rutaAExportar)

    const moduloConRuta = await import(rutaAExportar)
    app.use('/', await moduloConRuta.default());
});


// ------------------------------------
// SERVIDOR
// ------------------------------------
app.get('/', (req, res) => {
    res.status(200).send('Esta vivo, VIVO...!!!')
})

http.createServer(app).listen(config.servidor.puerto, () => {
    console.log(`\nServidor escuchando en http://${config.servidor.host}:${config.servidor.puerto}/`)
})

export default app;