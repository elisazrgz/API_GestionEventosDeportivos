const express = require("express");
const usersRouter = express.Router();
const {registerUser, loginUser, showUserProfile} = require("../../controllers/users_controller");
const checkToken = require("../../../utils/middleware");

// RUTAS DE AUTENTICACIÓN
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/profile", checkToken, showUserProfile); // protegida

module.exports = usersRouter;