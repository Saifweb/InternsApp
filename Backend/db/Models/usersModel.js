//zied s'task
const mongoose = require('mongoose');
//This is an Example of Model List (change List to Your Table name )!
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // ou il travail
    block: {
        type: String,
        default: false
    },
    supervisor_id: {
        type: mongoose.Types.ObjectId,
        require: false,
        ref: "User"
    },
    RefreshToken: {
        type: String,
        default: false
    }

})



const User = mongoose.model('User', UserSchema);


module.exports = { User }