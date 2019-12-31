const ARCHIVO_LOG_PREDEFINIDO = 'app.log'
const RUTA_LOGS = process.cwd() + '/logs/'

/**
 * 
 * @param {*} nombreArchivo 
 */
export async function get_log(nombreArchivo = ARCHIVO_LOG_PREDEFINIDO) {
    return logger.createLogger(RUTA_LOGS + nombreArchivo)
}

