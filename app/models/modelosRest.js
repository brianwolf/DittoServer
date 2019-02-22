const { TiposError, ErrorAplicacion } = require('./errores')
const { ObjectId } = require('mongoose').Types

const nombreParametroRequest = 'req'
const nombreParametroResponse = 'res'
const nombreParametroContexto = 'ctx'
const cuerpoFuncionDefault = 'res.status(200).send(ctx)'

const funcionDefault = new Function(nombreParametroRequest, nombreParametroResponse, nombreParametroContexto, cuerpoFuncionDefault)

class EstructuraRest {

    static crearPorJson(obj) {
        return new EstructuraRest(
            obj.url,
            obj.tipo
        )
    }

    constructor(url, tipo) {
        this.url = url
        this.tipo = tipo
    }
}

class DittoRest {

    static crearPorJson(obj) {
        return new DittoRest(
            obj.nombre,
            obj.proyecto,
            obj.funcion,
            obj.contexto,
            obj.rest,
            obj._id
        )
    }

    constructor(nombre, proyecto = null, funcion, contexto, rest, _id = new ObjectId()) {
        this.nombre = nombre
        this.proyecto = proyecto
        this.funcion = funcion
        this.contexto = contexto
        this.rest = EstructuraRest.crearPorJson(rest)
        this._id = _id
    }

    ejecutarMock(req, res) {
        try {
            let funcionReal = this.funcion.getFuncionEvaluada()
            return funcionReal(req, res, this.contexto)

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

    static crearPorJson(obj) {
        return new FuncionRest(
            obj.nombre,
            obj.proyecto,
            obj.cuerpoFuncion,
            obj._id
        )
    }

    constructor(nombre, proyecto = null, cuerpoFuncion = funcionDefault, _id = new ObjectId()) {
        this.nombre = nombre
        this.proyecto = proyecto
        this.cuerpoFuncion = cuerpoFuncion
        this._id = _id
    }

    getFuncionEvaluada() {
        return new Function(nombreParametroRequest, nombreParametroResponse, nombreParametroContexto, this.cuerpoFuncion)
    }
}

module.exports = { DittoRest, FuncionRest }