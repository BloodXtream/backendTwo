const mongoose = require("mongoose");
require('dotenv').config();

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to database");
    })
}

module.exports = connectToDb;