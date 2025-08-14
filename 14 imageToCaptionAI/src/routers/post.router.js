const express = require('express')
const multer = require('multer')
const { createPostController } = require('../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/',
    authMiddleware,
    upload.single('image'),
    createPostController)

module.exports = router
