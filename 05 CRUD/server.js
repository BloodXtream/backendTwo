const express = require('express');
const connectToDb = require('./src/db/db');
const noteModel = require('./src/models/note.model');
require('dotenv').config();

const app = express();
app.use(express.json());
connectToDb();

const PORT = process.env.PORT || 3000;

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    console.log(title, content);

    await noteModel.create({
        title,
        content
    })

    res.json({
        message: "Note created successfully"
    })
})

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.json({
        message: "Notes fetch Succcesfully",
        notes
    })
})

app.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    await noteModel.findOneAndDelete({
        _id: noteId
    })
    res.json({
        message: "note deleted successfully"

    })
})

app.patch('/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    await noteModel.findOneAndUpdate({
        _id: noteId
    }, {
        title: title,
        content: content
    })
    res.json({
        message: "note updated succesfully"
    })
})



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})