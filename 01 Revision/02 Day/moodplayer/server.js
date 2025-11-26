require('dotenv').config();
const express = require("express");
const connectToDB = require('./src/db/db')
const noteModel = require('./src/model/note.model')
const app = express();

app.use(express.json());
connectToDB();

app.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    const notes = await noteModel.create({
        title, content
    });
    res.status(200).json({
        message: "Notes Created Successfully"
    });
});

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Notes Fetched succesfully",
        notes
    });
});

app.delete("/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id
        await noteModel.findOneAndDelete({
            _id: noteId
        })
        res.status(200).json({
            message: "Notes Deleted Successfully",
            notes
        })
    } catch {
        (err) => {
            console.log(`Err while deleting: ${err}`)
        }
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is Running on Port: ${process.env.PORT}`);
});