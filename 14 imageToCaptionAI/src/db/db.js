const mongoose = require('mongoose')
require('dotenv').config()

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to the database successfully')
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err)
        })
}

module.exports = connectToDB