module.exports = dbo => {

    const getUsuariosPorNick = function (nick) {

        var query = { "login.nick": nick };
        dbo.collection("users").find(query).toArray((err, result) => {

            if (err) throw err;

            console.log(result);
            // db.close();

            return result
        })
    }
}