const express = require('express')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/posts [protected] {image_file}

router.post('/',
    authMiddleware,
    upload.single('image'),
    createPostController)        // req.data=userData 

module.exports = router