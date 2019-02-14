const { TiposError, ErrorAplicacion } = require('./errores')

const nombreObjetoRequest = 'req'
const nombreObjetoContexto = 'ctx'

class DittoRest {

    constructor(obj) {
        this.id = obj.id
        this.url = obj.url
        this.funcion = obj.funcion
        this.contexto = obj.contexto
    }

    getRespuestaMockeada() {
        try {
            return this.funcion(contexto)

        } catch (error) {
            throw new ErrorAplicacion({
                'codigo': TiposError.EVALUACION,
                'mensaje': 'Error en la evaluacion',
                'error': error
            })
        }
    }
}

class FuncionRest {

    constructor(obj) {
        this.id = obj.id
        this.funcionString = obj.funcionString
    }

    getFuncionEvaluada() {
        return new Function(nombreObjetoRequest, nombreObjetoContexto, this.funcionString)
    }
}

module.exports = { DittoRest, FuncionRest }