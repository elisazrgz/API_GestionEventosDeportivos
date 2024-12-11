const jwt = require("jsonwebtoken");

// Función para crear el token donde se guarda la información correspondiente de la sesión de ese usuario

const createToken = (info) => {
    const data = {
        user_id: info._id,
        user_username: info.username
    }
    return jwt.sign(data, process.env.SECRET_KEY_JWT, {expiresIn: "2h"});
    // 1er parámetro: datos del usuario
    // 2o parámetro: contraseña de JWT
    // 3er parámetro: tiempo de expiración del token
}

module.exports = createToken;