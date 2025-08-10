const express = require('express')
const userModel = require('../models/user.model')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.create({
        username,
        password
    })

    res.status(201).json({
        message: "user registered successfully",
        user,
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const users = await userModel.findOne({
        username: username
    })

    if (!users) {
        return res.status(401).json({
            message: "Invalid User name"
        })
    }

    const isPasswordValid = password == users.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "[Invalid Password]"
        })
    }

    res.status(200).json({
        message: "user loggedIn successfully"
    })
})


module.exports = router