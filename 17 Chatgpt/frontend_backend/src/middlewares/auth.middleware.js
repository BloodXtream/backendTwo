const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/auth/login');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.id);
            next();
        } catch (error) {
            return res.redirect('/auth/login');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    authUser,
}