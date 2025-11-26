const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`Connected to DB`);
        }).catch((err) => {
            console.log(`Error while connecting to DB: ${err}`);
        })
}

module.exports = connectToDB