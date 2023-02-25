//Wassim s'Task
const mongoose = require('mongoose');

// This is an Example of Model List (change List to Your Table name )! !!

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
    }

})

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = { Auth }