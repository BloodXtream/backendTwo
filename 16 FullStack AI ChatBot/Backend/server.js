require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service');
const { FunctionResponse } = require('@google/genai');

require('dotenv').config()

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Adjust this to your frontend URL
    },
});

const chatHistory = [

]

io.on("connection", (socket) => {
    console.log('A User Connected')

    socket.on("disconnected", () => {
        console.log("A User Disconnected")
    })

    socket.on('ai-message', async (data) => {
        console.log("Prompt: ", data)

        chatHistory.push({
            role: "user",
            parts: [{ text: data }]
        })

        const response = await generateResponse(chatHistory)

        chatHistory.push({
            role: "model",
            parts: [{ text: response }]
        })

        socket.emit('ai-message-response', response)
    })

});


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})