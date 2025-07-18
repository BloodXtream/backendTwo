const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: v => /^[0-9]{10}$/.test(v),
            message: props => `${props.value} is not valid phone number!`
        }
    }
})

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;