
class ErrorAplicacion extends Error {

    constructor(obj) {
        super(obj.mensaje)

        this.codigo = obj.codigo
        this.error = obj.error
    }

    getCodigoHttp() {
        return CodigosHttp.APLICACION
    }

    crearRespuestaRest() {
        return {
            'codigo': this.codigo.toString(),
            'mensaje': this.message
        }
    }
}

const TiposError = {
    EVALUACION: 'EVALUACION'
}


const CodigosHttp = {
    APLICACION: 600,
    BASE_DE_DATOS: 700
}

const crearRespuestaRest = function (err, res) {
    
    if (err instanceof ErrorAplicacion) {
        res.status(err.getCodigoHttp()).send(err.crearRespuestaRest())
    }

    res.status(500).send()
}

module.exports = { ErrorAplicacion, TiposError, CodigosHttp, crearRespuestaRest }