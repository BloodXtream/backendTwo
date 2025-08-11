const app = require('./src/app')
const connectToDb = require('./src/db/db')
require('dotenv').config()

const PORT = process.env.PORT

connectToDb()

app.listen(PORT, () => {
    console.log(`Connected to port: ${PORT}`)
})