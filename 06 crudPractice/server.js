const express = require('express');
const connectToDb = require('./src/db/db');
const TodoModel = require('./src/models/todo.model');

require('dotenv').config();

const app = express();
app.use(express.json());
connectToDb();

const PORT = process.env.PORT || 3000;

app.post('/todos', async (req, res) => {
    const { title, completed, dueDate } = req.body

    await TodoModel.create({
        title,
        completed,
        dueDate
    })

    res.json({
        message: "Added Task successfully"
    })
})

app.get('/todos', async (req, res) => {
    const todos = await TodoModel.find();

    res.json({
        message: "Tasks Fetched successfully",
        todos
    })
})

app.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    await TodoModel.findOneAndDelete({
        _id: todoId
    })

    res.json({
        message: "Task Deleted successfully"
    })
})

app.patch('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    const { title, completed, dueDate } = req.body;

    const updatedTodo = await TodoModel.findOneAndUpdate({
        _id: todoId
    }, {
        title,
        completed,
        dueDate
    })

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
        message: "todo updated successfully",
        updatedTodo
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})