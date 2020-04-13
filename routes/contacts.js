const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')

// @route     GET api/contacts
// @desc      Get all contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ date: -1 })
    res.send(contacts)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ error: "Server Error" })
  }
})

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post('/', auth, async (req, res) => {
  const contact = new Contact({
    ...req.body,
    user: req.user._id
  })

  try {
    await contact.save()
    res.status(201).send({ contact })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, type, phone } = req.body

  let contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).send({ msg: "Contact not found" })
    }

    // Make sure user owns the contact
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(404).send({ msg: "Contact not found" })
    }

    contact = await Contact.findByIdAndUpdate(req.params.id,
      { $set: contactFields },
      { new: true }
    )

    res.json(contact)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ error: "Server Error" })
  }
})

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).send({ msg: "Contact not found" })
    }
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(404).send({ msg: "Contact not found" })
    }

    await Contact.deleteOne({ _id: req.params.id })
    res.send({ msg: "Contact deleted successfully" })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

module.exports = router