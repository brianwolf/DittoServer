const mongoose = require("mongoose");


const dittoRestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    funcion: mongoose.Schema.Types.ObjectId,
    contexto: Map
})
const DittoRestModel = mongoose.model('dittos_rest', dittoRestSchema)


const funcionRestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    funcionString: String
})
const FuncionRestModel = mongoose.model('funciones_rest', funcionRestSchema)

module.exports = { DittoRestModel, FuncionRestModel }