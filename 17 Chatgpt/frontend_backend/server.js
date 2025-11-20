require('dotenv').config();
const http = require('http')
const app = require('./src/app');
const connectDB = require('./src/db/db');
const setupSocketServer = require('./src/socket/socket.server')

const httpServer = http.createServer(app)

connectDB()
setupSocketServer(httpServer)

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
