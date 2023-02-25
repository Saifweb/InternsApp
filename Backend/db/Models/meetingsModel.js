//Wassim s'Task
const mongoose = require('mongoose');

// This is an Example of Model List (change List to Your Table name )! !!

const MeetingSchema = new mongoose.Schema({
    internId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    admin_supervisorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
})

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = { Meeting }