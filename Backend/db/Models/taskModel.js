//Wassim s'Task
const mongoose = require('mongoose');

// This is an Example of Model List (change List to Your Table name )! !!

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },

    userName:{
        type:String,
        required:false,

    },
    // with auth
    completed: {
        type: String,
        required: false,
        default: false
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true,
    }

})

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }