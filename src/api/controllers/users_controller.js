const Users = require("../models/users_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../../utils/jwt");

const registerUser = async (req, res) => {
    try {
        // Se valida si el usuario solicitado ya existe en la bdd, si es así se envía mensaje de error:
        const userDB = await Users.find({username: req.body.username});
        if (userDB.length !== 0) {
            return res.status(400).json({message: "Ya existe un usuario con ese nombre, por favor elija otro"});
        }
        // Si no existe se encripta la contraseña y se añade el usuario, devolviendo respuesta con los datos del usuario creado:
        req.body.password = await bcrypt.hash(req.body.password, 10); 
        const registeredUser = await Users.create(req.body);
        return res.status(201).json({message: "El usuario ha sido registrado con éxito", data: registeredUser});
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const loginUser = async (req, res) => {
    try {
        // Se guardan los datos de la petición:
        const {username, password} = req.body;
        // Se verifica si el usuario existe en la bdd y si no es así se devuelve el mensaje correspondiente:
        const userDB = await Users.findOne({username});
        if (!userDB){
            return res.status(400).json({message: "El usuario introducido no existe, por favor revise los datos o proceda a registrarse"})
        }
        // Si existe el usuario se compara la contraseña con la de la BDD encriptada:
        const checkForMatch = await bcrypt.compare(password, userDB.password);
        // Si no coinciden se envía mensaje de error; si hay match se crea el token y se devuelve en la respuesta:
        if (!checkForMatch){
            return res.status(400).json({message: "La contraseña introducida es incorrecta"})
        } else {
            return res.status(200).json({
                message: "El inicio de sesión fue realizado con éxito",
                token: createToken(userDB)
            })
        }
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const showUserProfile = async (req, res) => {
    try {
        // Búsqueda del usuario en la BDD mediante el _id:
        // (req.user es una propiedad que ha sido creada en el middleware de validación del token donde se encuentran los dato del usuario asociado a este)
        const userProfile = await Users.findById(req.user._id);
        // Respuesta con la información asociada a ese usuario:
        return res.status(200).json({success: true, data: userProfile});
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

module.exports = {
    registerUser,
    loginUser,
    showUserProfile}