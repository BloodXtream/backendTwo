const express = require('express');

const router = express.Router()

router.use((req, res, next) => {
    console.log('thismiddle ware is between router and api');
    next();
})

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

module.exports = router;