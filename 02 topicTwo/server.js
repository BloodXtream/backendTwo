const express = require("express");

const app = express();
app.use(express.json())

// api develrop karni h notes naam ki => yaha pr data aayegea 1: Title aur 2: Description
// NOTES => 1: TITLE , 2: DESCRIPTION

let notes = [];

app.post('/notes', (req, res) => {
    console.log(req.body);  // node direct req.body se data nhi padh sakta iss islye undefine araha tha result me 
    // hume req.body me jo data front end se agr padhna h to hume use karna padega buildin middle ware name called app.use(express.json())
    notes.push(req.body);
    res.json({
        message: "message added succesfully",
        notes: notes
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})