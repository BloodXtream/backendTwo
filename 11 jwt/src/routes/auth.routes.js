const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const router = express.Router()

// POST /register req.body = {username , password}

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        username
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "username already in exist..."
        })
    }

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 Days
    })

    res.status(201).json({
        message: "user register successfully",
        user
    })
})

router.get('/register', async (req, res) => {
    const token = req.cookies.token

    // ye agr token nhi milta hai tb ke liye use hoga 
    if (!token) {
        return res.status(401).json({
            message: "unauthorised: token not found"
        })
    }

    // aur ye agr token mil gya hai to usko varifi karne ke liye use hoga 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        return res.status(200).json({
            message: "user data fetched succesfullly",
            user
        })

    } catch (err) {
        res.status(401).json({
            message: "Unauthorized invalid token"
        })
    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // first we'll check weather the account exist or not with the username

    const user = await userModel.findOne({     // here we'll face two possibility 1st username match nhi karega  2nd username mathc karega 
        username
    })

    // first hum check karege ki agr hume acccout nhi milata to kya karna hoga hume
    if (!user) {
        return res.status(404).json({
            message: "user accoutn not found..."
        })
    }

    // ab agr acount milta hai aaage hum password bhi check karenge ki valid hai ki nhi hai
    const isPasswordValid = user.password === password

    // itna karen ke baad agr password shi nikal to kya kargne
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    // aur agr password shi nikalega to hum ek token generate karke dete hai 
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    // ab jo token hume mila hai use store hum user ke pass cookieStorage me karenge
    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    // ab response statuse bejenge 
    res.status(200).json({
        message: "user logged in successfully",
        user
    })
})

router.get('/logout', async (req, res) => {
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
})

module.exports = router