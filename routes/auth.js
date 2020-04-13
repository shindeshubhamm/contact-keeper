const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, (req, res) => {
  res.send(req.user)
})

// @route     POST api/auth
// @desc      Login user
// @access    Public
router.post('/', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ token })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = router