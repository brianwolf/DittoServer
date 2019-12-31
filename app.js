import express from 'express';
import http from 'http';

const app = express()


import { get_var } from './app/config/variables.js'

// ------------------------------------
// BASE DE DATOS
// ------------------------------------
import mongoose from 'mongoose';
const option = { useUnifiedTopology: true, useNewUrlParser: true }

const mongoUser = get_var('mongoUser')
const mongoPass = get_var('mongoPass')
const mongoHost = get_var('mongoHost')
const mongoPort = get_var('mongoPort')
const mongoBase = get_var('mongoBase')
const coneccion_str = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoBase}?authSource=admin`

mongoose.connect(coneccion_str, option, err => {
    if (err) throw err
    console.log(`Coneccion establecida con ${mongoBase}`)
})


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



app.listen(get_var('port'), () => {
    console.log(`\nServidor escuchando en http://${get_var('host')}:${get_var('port')}/`)
})

export default app;