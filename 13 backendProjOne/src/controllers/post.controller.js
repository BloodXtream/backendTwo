const postModel = require('../models/post.model')
const generateCaption = require('../service/ai.service')
const uploadFile = require('../service/storage.service')
const { v4: uuid4 } = require('uuid');

async function createPostController(req, res) {
    const file = req.file
    console.log("File Recived:", file)

    const base64Image = new Buffer.from(file.buffer).toString('base64')
    // console.log(base64Image)
    const caption = await generateCaption(base64Image)

    const result = await uploadFile(file.buffer, `${uuid4()}`)

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })
}

module.exports = {
    createPostController
}
