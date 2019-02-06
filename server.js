var express = require('express')
var http = require('http')
var app = express()
var MongoClient = require('mongodb').MongoClient

var config = require('./config/desa.json')
var db = null


app.get('/', (req, res) => {
    res.status(200).send('Hola mundo redondo...!!!')
})

http.createServer(app).listen(config.servidor.puerto, () => {
    console.log(`Servidor en http://${config.servidor.host}:${config.servidor.puerto}/`)
})

MongoClient.connect(`mongodb://${config.db.mongo.host}:${config.db.mongo.puerto}`, function (err, db) {

    if (err) throw err;

    var dbo = db.db(config.db.mongo.nombre);
    var query = { "login.nick": "lobezzzno" };
    dbo.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;

        console.log(result);
        db.close();
    });
});