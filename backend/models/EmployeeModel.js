// models/EmployeeModel.js
const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
  image: {
    type: String,
    validate: {
      validator: (v) => /\.(jpg|jpeg|png)$/.test(v),
      message: 'Image must be a jpg or png file'
    },
    required: false
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Invalid email format'
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: 'Phone number must be a 10-digit number'
    }
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'],
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
