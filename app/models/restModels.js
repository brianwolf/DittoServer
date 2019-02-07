const nombreObjetoRequest = 'req'
const nombreObjetoContexto = 'ctx'

export class Ditto {

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
      throw new ErrorDitto({
        codigo: Errores.EVALUACION,
        mensaje: 'Error en la evaluacion',
        error: error
      })
    }

  }
}

export class FuncionDitto {

  constructor(obj) {
    this.id = obj.id
    this.funcionString = obj.funcionString
  }

  getFuncionEvaluada() {
    return new Function(nombreObjetoRequest, nombreObjetoContexto, this.funcionString)
  }
}

export class ErrorDitto extends Error {

  constructor(obj) {
    this.codigo = obj.codigo
    this.mensaje = obj.mensaje
    this.error = obj.error
  }

  crearRespuestaRest() {
    return {
      'codigo': this.codigo,
      'mensaje': this.mensaje
    }
  }
}

export const Errores = {
  EVALUACION: Symbol('EVALUACION')
}