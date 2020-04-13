const mongoose = require('mongoose')
const User = require('./User')
const validator = require('validator')

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please enter a valid email!')
      }
    }
  },
  phone: {
    type: Number,
    // validate(value) {
    //   if (!value.match(/([0-9]{10})/)) {
    //     throw new Error('Please enter valid 10 digit number!')
    //   }
    // }
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Contact = mongoose.model('contact', ContactSchema)

module.exports = Contact