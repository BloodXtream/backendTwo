const http = require('http')


const server = http.createServer((req, res) => {
    res.end("hello new server response")
}) // Server create ho gaya hai
server.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})