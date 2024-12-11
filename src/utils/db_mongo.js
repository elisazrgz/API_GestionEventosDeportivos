const mongoose = require("mongoose");

// Conexión con el cluster donde se encuentra la BDD de Mongo sobre la que se ejecutará la API

const connectDB = async() => {
    try{
        const db = await mongoose.connect(process.env.DB_URL);
        const {name, host} = db.connection;
        console.log(`Working database ${name} and server ${host}`)
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

module.exports = connectDB;