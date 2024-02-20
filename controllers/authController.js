const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET_PASS;

const handleGetLogin = async (req, res) => {

    return res.render('login', {title: "Login"});
}



const handleLoginPost = async (req, res) => {

    const body = req.body;

    // if any field missing, send error to user
    if (!body.email || !body.password)
        return res.status(200).json({status: "Error: some fields are missing"});

    const user_details = {
        email: body.email,
    }

    // create the user
    const user = await User.findOne(user_details);
    if (!user)
        return res.redirect("/auth/register");

    const passwords_match = await bcrypt.compare(body.password, user?.password);

    if (!passwords_match) {
        return res.json({error: "wrong email/password"});
    }

    // generate JWT token for user and send it in the cookie.
    const token = jwt.sign(JSON.stringify({email: user.email, role: user.role, userId: user._id}), secret);

    res.cookie('token', token);
    return res.redirect("/url");
}



const handleGetRegister = async (req, res) => {

    return res.render('register', {title: "Register"});
}


const handleRegisterPost = async (req, res) => {
    const body = req.body;

    if (!body.name || !body.email || !body.password)
        return res.json({error: "fields are missing"});

    const pwd = await bcrypt.hash(body.password, 2);

    const user = await User.create({
        name: body.name,
        email: body.email,
        password: pwd,
        role: "USER"
    });

    // generate jwt token
    const token = jwt.sign({email: user.email, role: user.role, userId: user._id}, secret);

    res.cookie('token', token);
    return res.redirect("/url");
}



const handleLogout = async (req, res) => {
    if (req.user)
        delete req.user;
    else
        return res.status(200).json({msg: "bhai login to kar"});
    return res.clearCookie("token").redirect("/auth/login");
}




module.exports = {
    handleGetLogin,
    handleLoginPost,
    handleGetRegister,
    handleRegisterPost,
    handleLogout
}