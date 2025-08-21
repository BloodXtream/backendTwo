const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const indexRoutes = require('./routes/index.routes');
const app = express();

app.set("view engine", "ejs")
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', indexRoutes)
app.use('/auth', authRoutes)



module.exports = app;