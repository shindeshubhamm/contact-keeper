const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')

// @route     GET /api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, (req, res) => {
  res.send(req.user)
})

// @route     POST /api/auth
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

// @route     POST /api/auth/logout
// @desc      Logout User
// @access    Private
router.post('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.tokens = user.tokens.filter((token) => token.token !== req.token)
    await user.save()
    res.send({ msg: 'Logout successful.' })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ error: 'Internal server error.' })
  }
})

module.exports = router