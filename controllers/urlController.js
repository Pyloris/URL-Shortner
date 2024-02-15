const Url = require("../models/url");
const shortid = require("shortid");


const handleURLPage = async (req, res) => {

    const userId = req.userId;

    // get all urls
    const urls = await Url.find({ userRef: userId });

    res.render('url', {urls,});
}


const handleURL = async (req, res) => {

    const userId = req.userId;
    const shortId = shortid.generate();
    const url = req.body.url;

    await Url.create({
        shortId,
        userRef: userId,
        url,
    });

    res.status(200).json({status: "Short URL created"});
}


const handleURLId = async (req, res) => {
    const shortId = req.params.id;

    const urlEntry = await Url.findOne({ shortId, });

    if (!urlEntry)
        res.status(404).json({status: "ID not found"});

    res.redirect(urlEntry.url);
}


module.exports = {
    handleURLPage,
    handleURL,
    handleURLId
}