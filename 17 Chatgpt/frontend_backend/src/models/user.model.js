const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
        unique: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        requried: true,
        unique: true
    }
},
    { timestamps: true }
)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel