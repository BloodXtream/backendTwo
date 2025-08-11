const mongoose = require('mongoose')
require('dotenv').config()

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`MongoDB connection successful`)
        })
        .catch((err) => {
            console.log(`MongoDB connection Failed: ${err}`)
        })
}

module.exports = connectToDb