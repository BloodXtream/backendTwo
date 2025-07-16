const mongoose = require("mongoose");
require('dotenv').config();
// server database se kaise connet hoga wo hum db.js file me likhenge but connect hum server.js me karnege


function connectToDb() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to db");
    })
}

module.exports = connectToDb;