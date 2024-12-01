// CREACIÓN SERVIDOR

const express = require("express");

// configuro el servidor para usar variables de entorno:
require("dotenv").config();
// creo el servidor:
const server = express();
server.use(express.json());
// configuro por qué puerto se ejecuta:
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running port http://localhost:${PORT}`);
});

// CONEXIÓN CON BDD

const connectDB = require("./src/utils/db_mongo");
connectDB();

// TO DO:
// crear modelos de datos y exportimport en index
// mirar documentación mongoose (conexión y schema)