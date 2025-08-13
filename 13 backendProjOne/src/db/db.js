const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`MongoDB connected succesfully`)
        })
        .catch((err) => {
            console.error(`MongoDB Connection Error: ${err}`)
        })
}

module.exports = connectToDB