require('dotenv').config()
const express = require("express");
const connectDB = require("./src/db/db")
const app = express()

app.use(express.json())

connectDB()

app.listen(3000, () => {
    console.log(`Server is Running on Port: 3000`)
})
