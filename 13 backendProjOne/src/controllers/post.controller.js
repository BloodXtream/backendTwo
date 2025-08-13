const postModel = require('../models/post.model')
const generateCaption = require('../service/ai.service')

async function createPostController(req, res) {
    const file = req.file
    console.log("File Recived:", file)

    const base64Image = new Buffer.from(file.buffer).toString('base64')
    // console.log(base64Image)
    const caption = await generateCaption(base64Image)

    res.status(201).json({
        message: "Caption Generated Successfully",
        caption,
    })
}

module.exports = {
    createPostController
}
