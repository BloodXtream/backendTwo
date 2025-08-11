const app = require('./src/app')
const connectToDb = require('./src/db/db')

require('dotenv').config()
connectToDb()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})