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
    meetingDateStart: {
        type: Date,
        required: true,
    },
    meetingDateEnd: {
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    }
})

const Meeting = mongoose.model('Metting', MeetingSchema);

module.exports = { Meeting }