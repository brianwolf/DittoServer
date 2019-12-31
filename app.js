import express from 'express';

const app = express()

import * as vars from './app/config/variables.js'


// ------------------------------------
// BASE DE DATOS
// ------------------------------------
import mongoose from 'mongoose';
const option = { useUnifiedTopology: true, useNewUrlParser: true }

const MONGO_USER = vars.get('MONGO_USER')
const MONGO_PASS = vars.get('MONGO_PASS')
const MONGO_HOST = vars.get('MONGO_HOST')
const MONGO_PORT = vars.get('MONGO_PORT')
const MONGO_DB = vars.get('MONGO_DB')

const coneccion_str = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

mongoose.connect(coneccion_str, option, err => {
    if (err) throw err
    console.log(`Coneccion establecida con ${MONGO_DB}`)
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
import * as logger from './app/config/logger.js'

app.get('/', (req, res) => {

    logger.getLogger().info('asdasdasdasd')
    res.status(200).send('Esta vivo, VIVO...!!!')
})


const HOST = vars.get('HOST')
const PORT = vars.get('PORT')

let server = app.listen(PORT, () => {
    console.log(`\nServidor escuchando en http://${HOST}:${PORT}/`);
})
// server.close()

export default app;