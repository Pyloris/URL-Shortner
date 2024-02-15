const express = require("express");

// get all the handlers
const { handleGetLogin, handleLoginPost, handleGetRegister, handleRegisterPost } = require("../controllers/authController");

const authRouter = express.Router();


// auth routes
authRouter.get("/login", handleGetLogin);

authRouter.post("/login", handleLoginPost);

authRouter.get("/register", handleGetRegister);

authRouter.post("/register", handleRegisterPost);



module.exports = authRouter;