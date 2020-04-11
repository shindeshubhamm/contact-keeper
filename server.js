const express = require('express')
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 1337

app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/contacts', contactsRoute)

app.get('/', (req, res) => {
  res.send('This is your first page...')
})

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})