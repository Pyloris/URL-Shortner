const express = require("express");
const { handleURLPage, handleURL, handleURLId } = require("../controllers/urlController");

const urlRouter = express.Router();


urlRouter.get("/:id", handleURLId);

urlRouter.post("/", handleURL);

urlRouter.get("/", handleURLPage);



module.exports = urlRouter;