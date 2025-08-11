const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const router = express.Router()
require('dotenv').config()

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.create({
        username,
        password
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user
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

router.get('/user', async (req, res) => {
    const { token } = req.body
    if (!token) {
        return res.statur(401).json({
            message: "[Unauthorised]"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id: decoded.id
        }).select("-password -__v")

        res.status(200).json({
            message: "[Data fetched succesfully]",
            user
        })

    } catch (err) {
        return res.status(401).json({
            message: "[Invalid token]"
        })
    }
})


module.exports = router