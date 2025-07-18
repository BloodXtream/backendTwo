const express = require('express');
const connectToDb = require('./src/db/db');
const ContactModel = require('./src/models/contact.model');
require('dotenv').config();

const app = express();
app.use(express.json());
connectToDb();

const PORT = process.env.PORT || 3000;

app.post('/contacts', async (req, res) => {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);

    await ContactModel.create({
        name,
        email,
        phone
    })

    res.json({
        message: "User Contact info fetched Successfully..."
    })
})

app.get('/contacts', async (req, res) => {
    const contactData = await ContactModel.find();

    res.json({
        message: "Contact fetched succefully",
        contactData
    })
})

app.get('/contacts/:id', async (req, res) => {
    const contactId = req.params.id;
    const singleId = await ContactModel.findById({
        _id: contactId
    });

    res.json({
        message: "Contact info fetched by id...",
        singleId
    })
})

app.delete('/contacts/:id', async (req, res) => {
    const contactId = req.params.id;

    await ContactModel.findOneAndDelete({
        _id: contactId
    })

    res.json({
        message: "Id deleted Succesfully"
    })
})

app.patch('/contacts/:id', async (req, res) => {
    const contactId = req.params.id;
    const { name, email, phone } = req.body;
    const patchedData = await ContactModel.findOneAndUpdate({
        _id: contactId
    }, {
        name,
        email,
        phone
    })

    res.json({
        message: "Patched...",
        patchedData
    })
})


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})