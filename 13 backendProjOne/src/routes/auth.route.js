const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/auth.controller')

// POST /register
// POST /login
// GET /user [Protected]

router.post('/register', registerController)

router.post('/login', loginController)


module.exports = router