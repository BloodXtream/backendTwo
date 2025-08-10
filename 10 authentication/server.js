const connectedToDb = require('./src/db/db')
const app = require('./src/app')
require('dotenv').config()


connectedToDb()


app.listen(3000, () => {
    console.log('Server is connected to port 3000')
})