const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware.authUser, (req, res) => {
    res.render('home', {
        title: 'Welcome to ChatGPT'
    })
})

module.exports = router 