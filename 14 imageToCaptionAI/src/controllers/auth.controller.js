const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

require('dotenv').config()

async function registerController(req, res) {
    const { username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        username
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "Unauthorized: UserName Already Exist..."
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })

}

async function loginController(req, res) {
    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.status(404).json({
            message: "Not Found: User not found..."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(401).json({
            message: "Unauthorized: Invalid Password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User LoggedIn Successfully..."
    })

}

module.exports = {
    registerController,
    loginController
}