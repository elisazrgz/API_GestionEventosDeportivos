const jwt = require("jsonwebtoken");
const Users = require("../api/models/users_model");

// Función que valida si hay un token que permita acceder a rutas protegidas

const checkToken = async (req, res, next) => { 
    // Se valida que el token ha sido enviado por medio de el parámetro headers:
    if(!req.headers["authorization"]){
        return res.json({msg: "Esta acción requiere de un token"})
    }
   
    // Se guarda el token:
    const token = req.headers["authorization"];
    
    // Se verifica que el token es correcto:
    let data;
    try {
        const tokenToVerify = token.split(" ")[1];
        // es necesario modificar el string recibido ya que contiene más información además del puro código token
        data = jwt.verify(tokenToVerify, process.env.SECRET_KEY_JWT);
    } catch (error) {
        return res.status(401).json({msg: "El token es incorrecto"})
    }
    
    // Búsqueda en la BDD del usuario del token:
    const foundUser = await Users.findById(data.user_id); // el parámetro es la data con la que creamos el token -> jwt.js
    if(!foundUser) {
        return res.json({msg: "El usuario no existe"})
    }
    
    // Nueva propiedad del request (el token enviado), que corresponde al usuario de la BDD:
    req.user = foundUser;

    // Se autoriza a proceder con la función del controlador:
    next();
}

module.exports = checkToken