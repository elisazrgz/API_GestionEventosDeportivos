// FUNCIÓN QUE VALIDA SI HAY UN TOKEN DE INICIO SESIÓN QUE TE PERMITA ACCEDER A RUTAS PROTEGIDAS

const jwt = require("jsonwebtoken");
const Users = require("../api/models/users_model");

// el token previamente fue enviado al front (durante el proceso de login)
// por este parámetro lo podemos encontrar: req.authorization

const checkToken = async (req, res, next) => { 
    // valido que el token ha sido enviado:
    if(!req.headers["authorization"]){
        return res.json({msg: "debe incluir el token"})
    }
   
    // guardo ese token:
    const token = req.headers["authorization"];
    
    // verifico que el token es correcto:
    let data;
    try {
        const tokenToVerify = token.split(" ")[1];
        // el split es porque el token nos lo devuelven como "Bearer sdhjhfhsdjkdfk" y necesitamos solo el puro código token
        data = jwt.verify(tokenToVerify, process.env.SECRET_KEY_JWT);
    } catch (error) {
        return res.json({msg: "el token es incorrecto"})
    }
    
    // busco en la bdd el usuario del token:
    const foundUser = await Users.findById(data.user_id); // el parámetro es la data con la que creamos el token -> jwt.js
    if(!foundUser) {
        return res.json({msg: "el usuario no existe"})
    }
    
    // creo una nueva propiedad del request (el token enviado), que corresponde al usuario de la bdd:
    req.user = foundUser;

    // autorizo a pasar a la función del controlador:
    next();
}

module.exports = checkToken