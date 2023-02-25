//Mechichi s Task
const mongoose = require('mongoose');

//This is an Example of Model List (change List to Your Table name )!

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  resume: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  preSelection: {
    type: Boolean,
    default: false
  },
  dateOfInterview: {
    type: Date, default: null,
    validate: {
      validator: function () {
        return !this.preSelection || this.dateOfInterview;
      },
      message: 'dateOfInterview field is required if preSelection is true'
    }
  },
  selected: {
    type: Boolean,
    default: false
  }
});
const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = { Resume };