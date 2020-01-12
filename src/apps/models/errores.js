import http from "http-status-codes";


export const HTTP_ERROR_NEGOCIO = http.CONFLICT

/**
 * Clase usada para errores de conocidas de la aplicacion o errores de negocio
 */
export class AppException extends Error {

    constructor(codigo, mensaje, error = null) {
        super(mensaje)

        this.codigo = codigo
        this.error = error
    }

    static porJson(j) {
        return new AppException(j.codigo, j.mensaje, j.Error)
    }

    http() {
        return HTTP_ERROR_NEGOCIO
    }

    respuesta() {
        return {
            codigo: this.codigo.toString(),
            mensaje: this.message.toString()
        }
    }
}

/**
 * 
 * @param {*} err 
 * @param {*} res 
 */
export function crearRespuestaRest(err, res) {

    if (err instanceof AppException) {
        res.status(err.getCodigoHttp()).send(err.cuerpoRespuestaRest())
    }

    console.error(err)
    res.status(500).send()
}
