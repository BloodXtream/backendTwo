const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Welcome to ChatGPT'
    })
})

module.exports = router 