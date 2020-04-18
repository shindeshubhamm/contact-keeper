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
    required: [true, 'Please enter all required fields.'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please enter all required fields.'],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please enter a valid email!')
      }
    }
  },
  phone: {
    type: Number
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

ContactSchema.post('save', (error, doc, next) => {
  const { email, name } = error
  if (email || name) {
    return next(new Error('Please enter all fields correctly.'))
  }
})

const Contact = mongoose.model('contact', ContactSchema)

module.exports = Contact