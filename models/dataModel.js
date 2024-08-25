const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema({
  FullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
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
  ResumeLink: {
    type: String,
    required: true
  },
  CGPA: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    validate: {
      validator: function(v) {
        return v % 1 !== 0; // Ensures the value is a decimal
      },
      message: props => `${props.value} is not a valid CGPA. It must be a decimal number.`
    }
  },
  ActiveBacklogs: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Data', dataSchema)