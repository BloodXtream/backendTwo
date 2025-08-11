const mongoose = require('mongoose')
require('dotenv').config()

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`MongoDb connected successfully`)
        })
        .catch((err) => {
            console.error(`MongoDb connection Failed: ${err}`)
        })
}

module.exports = connectToDb