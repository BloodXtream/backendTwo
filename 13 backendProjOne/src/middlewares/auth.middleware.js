const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")
require('dotenv').config()

// is middleware se hum api ko protected bana rahe hai

async function authMiddleware(req, res, next) {
    const token = req.cookies.token

    // first we check for the token 
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login first"
        })
    }

    // if token is there then verify it as well with the help of jwt package
    try {
        // in next line we are verifying the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // and in this line we are finding the user with the help of userId
        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user         // this will have all info of the user formthe DB
        next()          // its an middleware 

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized: Invalid Token"
        })
    }


}

module.exports = authMiddleware