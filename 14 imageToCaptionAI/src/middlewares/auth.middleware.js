const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

require('dotenv').config()

async function authMiddleware(req, res, next) {
    const token = req.cookie.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access: LogIn First..."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized: Invalid Token"
        })
    }
}

module.exports = authMiddleware