const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 100,
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User