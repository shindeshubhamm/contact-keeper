const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please fill all the required fields.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please fill all the required fields.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please enter a valid email id.')
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Please fill all the required fields.'],
    trim: true,
    minlength: [6, 'Minimum 6 character password required.'],
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password should not contain "password"')
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// Verify user
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login!')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login!')
  }
  return user
}

// Avoid sending user's password and tokens array
UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// Generate auth token
UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Hash password before saving to database
UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

UserSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(new Error('Email already taken!'))
  }
  const { email, name, password } = error
  if (email || name || password) {
    return next(new Error('Please enter all required fields.'))
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User