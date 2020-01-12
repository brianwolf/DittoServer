import express from 'express';
import process from 'process';
import { getLogger } from './apps/config/logger.js';
import { mongo } from "./apps/config/mongo.js";
import { configrarExpress } from './apps/config/rest.js';
import { get } from './apps/config/variables.js';
import { cargaDinamicaRoutes } from './apps/utils/express_util.js';

let app = express()

configrarExpress(app)

const directorioRutas = process.cwd() + '/apps/routes'
cargaDinamicaRoutes(app, directorioRutas)


app.get('/', (req, res) => {
    getLogger().info('vivo!!!')
    res.status(200).send({ ditto: 'yo te elijo' })
})


const HOST = get('HOST')
const PORT = get('PORT')

let server = app.listen(PORT, () => {
    console.log(`\nServidor escuchando en http://${HOST}:${PORT}/`);
})

mongo

export default app;