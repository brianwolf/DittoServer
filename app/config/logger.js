import log4js from 'log4js'
import * as vars from './variables.js'

const LOG_PREDEFINIDO = vars.get('LOG_PREDEFINIDO')
const LOGS_RUTA = vars.get('LOGS_RUTA')
const LOGS_NIVEL = vars.get('LOGS_NIVEL')

var loggers = {}

/**
 * Devuelve un logger con log4js creando el logger en caso de ser necesario,
 * en caso de no enviarle ningun argumento usa el log predefido
 * 
 * **Uso:**
 * 
 * - getLogger().info('hola :)')
 * - getLogger().warn('tenemos que hablar')
 * - getLogger().error('AAAAHHHH....!!!!')
 * 
 * @param {*} nombreArchivo 
 */
export function getLogger(nombreLog = LOG_PREDEFINIDO) {

    for (const nombre of Object.keys(loggers)) {
        if (nombre == nombreLog) {
            return loggers[nombreLog]
        }
    }

    let appenders = JSON.parse(`{ "${nombreLog}": { "type": "file", "filename": "${LOGS_RUTA + nombreLog}.log" }}`)
    let categories = JSON.parse(`{ "default": { "appenders": ["${nombreLog}"], "level": "${LOGS_NIVEL}" } }`)

    let configNueva = log4js.configure({
        appenders: appenders,
        categories: categories
    });

    let loggerNuevo = configNueva.getLogger()
    loggers[nombreLog] = loggerNuevo

    return loggerNuevo
}
