const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function getRegisterController(req, res) {
    try {
        res.render('register');
    } catch (error) {
        console.error("Error rendering register page:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function postRegisterController(req, res) {
    try {
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
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getLoginController(req, res) {
    try {
        res.render('login');
    } catch (error) {
        console.error("Error rendering login page:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function postLoginController(req, res) {
    try {
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

        return res.redirect('/')
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function userLogoutController(req, res) {
    try {
        res.clearCookie('token')
        res.redirect('/auth/login');
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController,
    userLogoutController
}