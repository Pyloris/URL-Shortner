const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true });


const Url = mongoose.model('urls', urlSchema);


module.exports = Url;