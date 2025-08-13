const express = require('express')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth.middleware')
const { createPostController } = require('../controllers/post.controller')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/posts [protected] {image_file}

router.post(
    '/',
    authMiddleware,             // req.data=userData
    upload.single('image'),
    createPostController
)
module.exports = router
