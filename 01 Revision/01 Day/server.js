const express = require('express');
const app = express();

let notes = []

app.use(express.json())

// api /Notes= titile and description

app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message: "Notes created successfully"
    })
})

app.get('/notes', (req, res) => {
    res.json({
        message: "Notes fetched successfully",
        notes: notes
    })
})

app.delete('/notes/:index', (req, res) => {
    const index = req.params.index
    delete notes[index]
    res.json({
        message: "Notes deleted sucessfully",
        notes: notes
    })
})

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index
    const { title, description } = req.body

    notes[index].title = title
    notes[index].description = description

    res.json({
        message: "Notes updated sucessfully",
    })
})


app.listen(3000, () => {
    console.log(`Server is running on PORT- 3000`);
})