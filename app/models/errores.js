
class AppException extends Error {

    static crearPorJson(obj) {
        return new AppException(obj.mensaje, obj.codigo, obj.Error)
    }

    constructor(mensaje, codigo, error = null) {
        super(mensaje)

        this.codigo = codigo
        this.error = error
    }

    getCodigoHttp() {
        return CodigosHttp.APLICACION
    }

    cuerpoRespuestaRest() {
        return {
            'codigo': this.codigo.toString(),
            'mensaje': this.message.toString()
        }
    }
}

const TiposError = {
    FUNCION_NO_EXISTE: 'FUNCION_NO_EXISTE',
    EVALUACION: 'EVALUACION'
}

const CodigosHttp = {
    APLICACION: 600,
    BASE_DE_DATOS: 700
}

const crearRespuestaRest = function (err, res) {

    if (err instanceof AppException) {
        res.status(err.getCodigoHttp()).send(err.cuerpoRespuestaRest())
    }

    console.error(err)
    res.status(500).send()
}

module.exports = { AppException: ErrorAplicacion, TiposError, CodigosHttp, crearRespuestaRest }