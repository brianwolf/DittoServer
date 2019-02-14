const mongoose = require("mongoose");

const dittoRestSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    url: String,
    funcion: mongoose.Schema.Types.ObjectId,
    contexto: Map
})
var DittoRestModel = mongoose.model('dittosRest', dittoRestSchema)


const funcionRestSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    funcionString: String
})
var FuncionRestModel = mongoose.model('funcionesRest', funcionRestSchema)

module.exports = { DittoRestModel, FuncionRestModel }