const mongoose = require('mongoose');

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