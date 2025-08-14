const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel