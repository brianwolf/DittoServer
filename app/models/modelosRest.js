const { TiposError, ErrorAplicacion } = require('./errores')
const { ObjectId } = require('mongoose').Types

const nombreParametroRequest = 'req'
const nombreParametroResponse = 'res'
const nombreParametroContexto = 'ctx'
const cuerpoFuncionDefault = 'res.status(200).send(ctx)'

const funcionDefault = new Function(nombreParametroRequest, nombreParametroResponse, nombreParametroContexto, cuerpoFuncionDefault)

class EstructuraRest {

    static crearPorJson(obj) {
        return new DittoRest(
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
            FuncionRest.crearPorJson(obj.funcionRest),
            obj.contexto,
            obj._id,
            obj.rest
        )
    }

    constructor(nombre, proyecto = null, funcionRest, contexto, estructuraRest, _id = new ObjectId()) {
        this._id = _id
        this.nombre = nombre
        this.proyecto = proyecto
        this.funcionRest = funcionRest
        this.contexto = contexto
        this.estructuraRest = estructuraRest
    }

    ejecutarMock(req, res) {
        try {
            return this.funcionRest(req, res, this.contexto)

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
            obj._id,
            new Function(nombreParametroRequest, nombreParametroResponse, nombreParametroContexto, obj.cuerpoFuncion)
        )
    }

    constructor(nombre, proyecto = null, _id = new ObjectId(), funcion = funcionDefault) {
        this._id = _id
        this.nombre = nombre
        this.proyecto = proyecto
        this.funcion = funcion
    }
}

module.exports = { DittoRest, FuncionRest }