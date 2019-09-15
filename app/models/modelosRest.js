import { TiposError, ErrorAplicacion } from './errores'
import { Types } from 'mongoose'

const nombreParametroRequest = 'req'
const nombreParametroContexto = 'ctx'
const cuerpoFuncionDefault = 'res.status(200).send(ctx)'

const funcionDefault = new Function(nombreParametroRequest, nombreParametroContexto, cuerpoFuncionDefault)

export class EstructuraRest {

    constructor(url, verbo) {
        this.url = url
        this.verbo = verbo
    }
}

export class DittoRest {

    constructor(nombre, proyecto = null, funcion, contexto, url, verbo, _id = new Types.ObjectId()) {
        this.nombre = nombre
        this.proyecto = proyecto
        this.funcion = funcion
        this.contexto = contexto
        this.url = url
        this.verbo = verbo
        this._id = _id
    }

    ejecutarMock(req, res) {
        try {
            let funcionEvaluada = this.funcion.getFuncionEvaluada()
            return funcionEvaluada(req, res, this.contexto)

        } catch (error) {
            throw new ErrorAplicacion({
                'codigo': TiposError.EVALUACION,
                'mensaje': 'Error en la evaluacion',
                'error': error
            })
        }
    }
}

export class FuncionRest {

    constructor(nombre, cuerpoFuncion = funcionDefault, _id = new Types.ObjectId()) {
        this.nombre = nombre
        this.proyecto = proyecto
        this.cuerpoFuncion = cuerpoFuncion
        this._id = _id
    }

    getFuncionEvaluada() {
        return new Function(nombreParametroRequest, nombreParametroContexto, this.cuerpoFuncion)
    }
}

export class Proyecto {

    constructor(nombre, dittos, otrosProyectos, _id = new Types.ObjectId()) {
        this.nombre = nombre
        this.dittos = dittos
        this.otrosProyectos = otrosProyectos
        this._id = _id
    }
}


export class Respuesta {

    constructor(codigoHttp, cuerpo = {}, encabezados = []) {
        this.codigoHttp = codigoHttp
        this.cuerpo = cuerpo
        this.encabezados = encabezados
    }

    esValido() {
        return this.codigoHttp != null
    }
}


