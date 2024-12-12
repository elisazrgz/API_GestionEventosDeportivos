// CREACIÓN SERVIDOR

const express = require("express");

// Configuración del servidor para usar variables de entorno:
require("dotenv").config();

// Importación de las rutas:
const routes = require("./src/api/routers/routes");

// Se crea el servidor:
const server = express();
server.use(express.json());
server.use('/', routes);

// Se establece por qué puerto se ejecuta:
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Servidor corriendo por puerto http://localhost:${PORT}`);
});

// CONEXIÓN CON BDD

const connectDB = require("./src/utils/db_mongo");
connectDB();