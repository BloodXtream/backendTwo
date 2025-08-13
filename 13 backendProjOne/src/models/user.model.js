const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model("userData", userSchema)

module.exports = userModel