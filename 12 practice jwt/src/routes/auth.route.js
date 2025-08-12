const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const routes = express.Router()
require('dotenv').config()

routes.post('/register', async (req, res) => {
    const { username, password } = req.body

    // while registering the username check wheather the username exist on the database or not 
    const isUserAlreadyExist = await userModel.findOne({
        username
    })

    // if it exist then print username already exist
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "username already exist..."
        })
    }

    // now when the username does not exist on the Mongodb then create new one 
    const user = await userModel.create({
        username, password
    })

    // now we will create token with the help of jwt package with jwt.sign()
    // inside the sign(_) we need to put two thing -1st: an unique data like id -2nd: an secret jwt key
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    // with the help of cookie-parse we will store the token in the user end inside the cookieshorage 
    res.cookie("token", token,
        {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)  // this token will expires after the seven days
        }
    )

    res.status(201).json({
        message: "user created successfully",
        user,
        token
    })

})

routes.get('/register', async (req, res) => {
    // just like req.body se hum password aur username nikalte hai wase hi req.cookies.token se hum token nikalte hai
    const token = req.cookies.token

    // ab req.cookies.token se token nikalne ke baad do possiblity banti hai -1st: ya to token ho empty  -2nd: ya token me kuch hoga 1st possiblity me to kuch nhi karna hoga but 2nd possiblity me hume verify karna padega ki tocked valid hai bhi ke nhi 

    // 1st step to check wheather the token something or its empty
    if (!token) {
        return res.status(401).json({
            message: "unauthorised: token not found"
        })
    }

    // 2nd now we have to verify the token, so we can avoid the forging
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // now with the help of decoded we will find the id of the token to login 
        const user = await userModel.findOne({
            _id: decoded.id
        })

        res.status(200).json({
            message: "User data fetched succesfully",
            user
        })

    } catch (err) {
        res.status(401).json({
            message: "unauthorized Invalid Token"
        })
    }
})

routes.post('/login', async (req, res) => {
    const { username, password } = req.body

    // first we'll be checking the username exist or not
    const user = await userModel.findOne({
        username
    }).select("-password -__v")

    if (!user) {
        return res.status(404).json({
            message: "Username does not exist"
        })
    }

    const isPasswordValid = user.password === password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Unauthorized: Invalid Password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Login successfully",
        user
    })
})

routes.get('/logout', async (req, res) => {
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
})


module.exports = routes

