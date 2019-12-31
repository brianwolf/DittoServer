const mongoose = require("mongoose");


const tiposURL = [
    'POST',
    'GET',
    'DELETE',
    'PATH',
    'PUT'
]

const dittoRestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String, unique: true, required: true
    },
    proyecto: String,
    funcion: {
        type: mongoose.Schema.Types.ObjectId, required: true
    },
    contexto: Map,
    rest: {
        url: {
            type: String, unique: true, required: true
        },
        tipo: {
            type: String, enum: tiposURL, unique: true, required: true
        }
    }
})
const DittoRestModel = mongoose.model('dittos_rest', dittoRestSchema)


const funcionRestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String, unique: true, required: true
    },
    proyecto: {
        type: String, unique: true
    },
    cuerpoFuncion: String
})
const FuncionRestModel = mongoose.model('funciones_rest', funcionRestSchema)

module.exports = { DittoRestModel, FuncionRestModel }