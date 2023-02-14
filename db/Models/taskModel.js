//Wassim s'Task
const mongoose = require('mongoose');

// This is an Example of Model List (change List to Your Table name )!

const TaskSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    // with auth
    completed: {
        type: Boolean,
        required: false
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: false
    }

})

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }