const express = require("express");
const usersRouter = express.Router();
const {registerUser, loginUser, viewUserProfile} = require("../../controllers/users_controller");
const checkToken = require("../../../utils/middleware");

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/profile", checkToken, viewUserProfile);

module.exports = usersRouter;