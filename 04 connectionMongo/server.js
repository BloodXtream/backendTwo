// POST - /notes - (TITLE AND CONTENT)
// GET - /notes - get all notes
// DELETE - /notes:id - delete the note permanetly
// PATCH - /notes:id - update a existing note
const express = require("express");
const connectToDb = require("./src/db/db");
require('dotenv').config();


connectToDb()
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// idhr server database se connect hoga server.js file me

app.get('/', (req, res) => {
    res.send("helo world");
})

app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    console.log(title, content);

})

app.listen(PORT, () => {
    console.log("Server Started a port 3000");
})