require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service')

require('dotenv').config()

const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('A User Connected')

    socket.on("disconnected", () => {
        console.log("A User Disconnected")
    })

    socket.on("ai-message", async (data) => {
        console.log('Received AI message', data.prompt);
        const response = await generateResponse(data.prompt);
        console.log('AI Response:', response);

        socket.emit('ai-message-response', { response });       // Sender
    });

});


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})