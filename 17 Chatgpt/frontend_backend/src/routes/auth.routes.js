const express = require('express');
const { getRegisterController } = require('../controllers/auth.controller');
const router = express.Router();

router.get('/register', getRegisterController)

module.exports = router;    