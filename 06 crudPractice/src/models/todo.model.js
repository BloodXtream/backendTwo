const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    dueDate: Date
})

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;