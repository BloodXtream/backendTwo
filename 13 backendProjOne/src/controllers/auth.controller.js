const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    const { username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        username
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "Unauthrosized: Invalid Username"
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

    res.cookie("token", token,
        {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) //7 days
        }
    )

    res.status(201).json({
        message: "User Registered succesfully",
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
            message: "Not Found: User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Unauthorized: Invalid password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}