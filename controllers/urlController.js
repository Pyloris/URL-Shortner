const Url = require("../models/url");
const User = require("../models/auth");
const shortid = require("shortid");


const handleURLPage = async (req, res) => {

    const userId = req.user.userId;

    // get all urls
    let urls;
    let users;
    if (req.user.role == "ADMIN"){
        urls = await Url.find({});
        // find all users as well
        users = await User.find({});
    }
    else {
        urls = await Url.find({ userRef: userId });
    }


    res.render('url', {urls, title: "URL", currentUser: req.user, users,});
}


const handleURL = async (req, res) => {

    const userId = req.user.userId;
    const shortID = shortid.generate();
    const url = req.body.url;
    try {
        await Url.create({
            shortID,
            userRef: userId,
            url,
            clicks: []
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({status:"could not shorten URL"});
    }

    res.status(200).json({status: "Short URL created"});
}


const handleURLId = async (req, res) => {
    const shortID = req.params.id;

    const urlEntry = await Url.findOneAndUpdate({ shortID, }, { $push: { clicks: Date.now() }});

    if (!urlEntry)
        res.status(404).json({status: "ID not found"});

    res.redirect(urlEntry.url);
}


const handleAnalytics = async (req, res) => {
    const shortID = req.params.id;

    const urlEntry = await Url.findOne({ shortID, });

    if (!urlEntry)
        return res.status(404).json({status: "ID not found"});

    return res.render('analytics', {url: urlEntry, title: "Analytics"});
}


module.exports = {
    handleURLPage,
    handleURL,
    handleURLId,
    handleAnalytics
}