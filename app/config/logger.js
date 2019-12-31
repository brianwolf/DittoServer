import log4js from 'log4js'
import * as vars from './variables.js'

// log4js.configure({
//     appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
//     categories: { default: { appenders: ['cheese'], level: 'debug' } }
// });

// const logger = log4js.getLogger('cheese');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

const LOG_PREDEFINIDO = vars.get('LOG_PREDEFINIDO')
const LOGS_RUTA = vars.get('LOGS_RUTA')
const LOGS_NIVEL = vars.get('LOGS_NIVEL')

let loggers = {}

/**
 * 
 * @param {*} nombreArchivo 
 */
export function getLogger(nombreLog = LOG_PREDEFINIDO) {

    for (const nombre of Object.keys(loggers)) {
        if (nombre == nombreLog) {
            return logger[nombreLog]
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

