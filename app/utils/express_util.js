import fs from 'fs';
import { getLogger } from '../config/logger.js'
import process from 'process'

const directorioRutas = process.cwd() + '/app/routes/'

/**
 * 
 * @param {*} app 
 */
export async function cargaDinamicaRoutes(app) {

    fs.readdirSync(directorioRutas).forEach(async archivo => {

        var rutaAExportar = directorioRutas + archivo

        const moduloConRuta = await import(rutaAExportar)
        app.use('/', await moduloConRuta.default());

        console.log('ruta exportada -> ' + rutaAExportar)
        getLogger().info('ruta exportada -> ' + rutaAExportar)
    });
}

