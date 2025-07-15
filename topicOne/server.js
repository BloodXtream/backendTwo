// const http = require('http')


// const server = http.createServer((req, res) => {
//     res.end("hello new server response")
// }) // Server create ho gaya hai
// server.listen(3000, () => {
//     console.log(`Server is running on port 3000`)
// })


// Server with Express package

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to  page');
})
app.get('/home', (req, res) => {
    res.send('Welcome to home page');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
