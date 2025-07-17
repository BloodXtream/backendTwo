const mongoose = require('mongoose');

// Title and Content
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;