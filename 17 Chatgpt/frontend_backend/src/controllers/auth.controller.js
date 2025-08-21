const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function getRegisterController(req, res) {
    res.render('register');
}

async function postRegisterController(req, res) {
    const { username, password, email } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists with this username or email"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getLoginController(req, res) {
    res.render('login');
}

async function postLoginController(req, res) {
    const { identifier, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email: identifier },
            { username: identifier }
        ]
    })

    if (!user) {
        return res.redirect('/auth/login?error=User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.redirect('/auth/login?error=Invalid password')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


module.exports = {
    getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController,
}