const express = require("express");

const app = express();
app.use(express.json()) // middleware

app.get('/', (req, res) => {
    res.send("Hello, world...!");
})

// Notes : Title , Content
let notes = [];
app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message: "Notes create Successfully"
    })
})

app.get('/notes', (req, res) => {
    res.json(notes);
})

//  DELETE: / notes / :0
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.json({
        message: "Notes deleted succesfully",
    })
})

// PATCH/notes/:index => {title}
app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const { title, content } = req.body;

    notes[index].title = title;
    notes[index].content = content;
    res.json({
        message: "Title updated successfully",
    })
})

app.listen(3000, () => {
    console.log("Server Started on port: 3000");
})