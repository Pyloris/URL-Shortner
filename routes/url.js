const express = require("express");
const { handleURLPage, handleURL, handleURLId, handleAnalytics } = require("../controllers/urlController");

const urlRouter = express.Router();


urlRouter.get("/:id", handleURLId);

urlRouter.post("/", handleURL);

urlRouter.get("/", handleURLPage);

urlRouter.get("/analytics/:id", handleAnalytics);


module.exports = urlRouter;