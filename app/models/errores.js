
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

module.exports = { ErrorAplicacion, TiposError, CodigosHttp }