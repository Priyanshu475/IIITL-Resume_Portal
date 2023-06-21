const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema({
  Rollno: {
    type: String,
    required: true
  },
  Branch: {
    type: String,
    required: true
  },
  BatchYear: {
    type: Number,
    required: true
  },
  ResumeLink:{
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Data', dataSchema)