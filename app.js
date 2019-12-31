import express from 'express';
import { getLogger } from './app/config/logger.js';
import { mongo } from "./app/config/mongo.js";
import { configrarExpress } from './app/config/rest.js';
import { get } from './app/config/variables.js';
import { cargaDinamicaRoutes } from './app/utils/express_util.js';

let app = express()

configrarExpress(app)
cargaDinamicaRoutes(app)


app.get('/', (req, res) => {
    getLogger().info('vivo!!!')
    res.status(200).send({ estado: 'vivo!!!' })
})


const HOST = get('HOST')
const PORT = get('PORT')

let server = app.listen(PORT, () => {
    console.log(`\nServidor escuchando en http://${HOST}:${PORT}/`);
})

mongo

export default app;