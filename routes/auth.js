const express = require("express");
const Auth = require("../middleware/auth");

// get all the handlers
const { handleGetLogin, handleLoginPost, handleGetRegister, handleRegisterPost, handleLogout } = require("../controllers/authController");

const authRouter = express.Router();


// auth routes
authRouter.get("/login", handleGetLogin);

authRouter.post("/login", handleLoginPost);

authRouter.get("/logout", Auth(), handleLogout);

authRouter.get("/register", handleGetRegister);

authRouter.post("/register", handleRegisterPost);



module.exports = authRouter;