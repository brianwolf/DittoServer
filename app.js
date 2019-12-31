import express from 'express';
// import fs from 'fs';
import * as logger from './app/config/logger.js';
import * as rest from './app/config/rest.js';
import * as vars from './app/config/variables.js';
import { cargaDinamicaRoutes } from './app/utils/express_util.js';

const app = express()

rest.configrarExpress(app)

// const pathDeLasRutas = './app/routes'
cargaDinamicaRoutes(app)

// fs.readdirSync(pathDeLasRutas).forEach(async archivo => {

//     var rutaAExportar = pathDeLasRutas + '/' + archivo
//     console.log('ruta exportada -> ' + rutaAExportar)

//     const moduloConRuta = await import(rutaAExportar)
//     app.use('/', await moduloConRuta.default());
// });


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