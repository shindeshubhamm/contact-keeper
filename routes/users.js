const express = require('express')
const router = express.Router()

const User = require('../models/User')

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ token })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

module.exports = router