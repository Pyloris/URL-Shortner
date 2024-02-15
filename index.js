const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// connect mongoDB
const connectMongo = require("./connection");
connectMongo("mongodb://127.0.0.1:27017/url_db");


const app = express();
PORT = 8000;


// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


// setup middleware
const Auth = require("./middleware/auth");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


// setup routes
const urlRouter = require("./routes/url");
app.use("/url", Auth(["USER", "ADMIN"]), urlRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);



app.listen(PORT, () => console.log("Server is running on port " + String(PORT)));