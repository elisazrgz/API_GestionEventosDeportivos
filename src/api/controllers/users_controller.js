const Users = require("../models/users_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../../utils/jwt");

const registerUser = async (req, res) => {
    try {
        // recibo los datos
        const newUser = req.body;
        // valido si el usuario ya existe en la bdd
        const userDB = await Users.find({username: newUser.username});
        // si existe envío error de respuesta
        if (userDB.length !== 0) {
            return res.status(400).json({message: "ya existe un usuario con ese nombre"});
        }
        // si no existe encripto la contraseña y lo añado, devuelvo respuesta con los datos del usuario creado
        newUser.password = await bcrypt.hash(newUser.password, 10); 
        const registeredUser = await Users.create(newUser);
        return res.status(201).json({message: "el usuario ha sido registrado con éxito", data: registeredUser});
    } catch (error) {
        console.log(error)
    }
};

// función para crear el token previamente creada en jwt.js
const loginUser = async (req, res) => {
    try {
        // recibimos los datos
        const {username, password} = req.body;
        // verificamos si el usuario existe en la bdd
        const userDB = await Users.findOne({username});
        if (!userDB){
            return res.status(400).json({message: "el usuario no existe"})
        }
        // comparar la contraseña del usuario con la de la bdd encriptada
        const checkForMatch = await bcrypt.compare(password, userDB.password); // 1er parámetro es el string que quiero comparar y el 2o es el string encriptado
        // si no coinciden envío mensaje de error
        if (!checkForMatch){
            return res.status(400).json({message: "contraseña incorrecta"})
        }
        //si coinciden creo el token y lo devuelvo como respuesta
        return res.status(200).json({
            message: "Login realizado correctamente",
            token: createToken(userDB)
        })
    } catch (error) {
        console.log(error)
    }
};

const viewUserProfile = async (req, res) => {
    try {
        // nueva propiedad req.user -> creada en el middleware, guarda el usuario relacionado con el token
        // busco en la bdd por el _id generado por mongo
        const userData = await Users.findById(req.user._id);
        // devuelvo toda la información asociada a ese _id (usuario)
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error)
    }
};

module.exports = {registerUser, loginUser, viewUserProfile}