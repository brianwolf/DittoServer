import fs from 'fs';
import { getLogger } from '../config/logger.js'
import process from 'process'

const directorioRutas = process.cwd() + '/app/routes'

/**
 * Carga dinamicamente las rutas dentro de la carpeta routes del proyecto
 * 
 * @param {*} app 
 */
export function cargaDinamicaRoutes(app) {

    console.log(`\nCarga dinamica de rutas`)

    rutasDeArchivos(directorioRutas).forEach(async rutaAExportar => {

        console.log('ruta exportada -> ' + rutaAExportar)

        const moduloConRuta = await import(rutaAExportar)
        app.use(moduloConRuta.rutaBase, moduloConRuta.router);
    });
}


/**
 * 
 * @param {*} ruta 
 */
function rutasDeArchivos(ruta) {

    let subRutas = fs.readdirSync(ruta).map(a => ruta + '/' + a)

    let rutasArchivos = subRutas.filter(r => fs.lstatSync(r).isFile())
    let directorios = subRutas.filter(r => fs.lstatSync(r).isDirectory())

    directorios.forEach(d =>
        rutasArchivos = rutasArchivos.concat(rutasDeArchivos(d))
    )

    return rutasArchivos
}

