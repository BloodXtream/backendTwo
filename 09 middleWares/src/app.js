const express = require('express');
const indexRouter = require("./routes/index.route");

const app = express();

app.use((req, res, next) => {
    console.log('thi smiddle ware is between app and route');
    next();
})

app.use('/', indexRouter);

module.exports = app;