const jwt = require("jsonwebtoken");

const createToken = (info) => {
    const data = {
        user_id: info._id,
        user_username: info.username
    }
    // 1er parámetro son los datos, 2o parámetro es una contraseña que debemos tener en una variable de entorno, 3o el tiempo en el que expira (opcional)
    return jwt.sign(data, process.env.SECRET_KEY_JWT, {expiresIn: "3h"});
}

module.exports = createToken;