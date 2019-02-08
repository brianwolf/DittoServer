use "DITTO-SERVER"

// ==================================
// ELIMINACION DE COLECCIONES
// ==================================
db.dittos.drop()
db.funciones.drop()


// ==================================
// CREACION DE COLECCIONES
// ==================================
db.createCollection("dittos")
db.createCollection("funciones")


// --------------------------------------------

db.funciones.insert({
    "funcionString": "function(req, res, ctx) { return ctx.body }"
})


db.dittos.insertMany([
    {
        "url": "/dittos/:id/funciones/:nombre",
        "funcion": ObjectId(),
        "contexto": {}
    },
    {
        "url": "/dittos/1234/funciones/soyUnNombre",
        "funcion": ObjectId(),
        "contexto": {}
    }
])

//cualquier URL
db.dittos.find({ "url": { $regex: "\/:*\w*\\?*(\w|,|=|&)*" } });




