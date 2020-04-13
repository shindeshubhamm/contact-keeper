const express = require('express')
const connectDB = require('./config/db')
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

// Initilize express server
const app = express()

// Connect database
connectDB()

// Init middleware to accept json as js object
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('This is your first page...')
})

// Define routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/contacts', contactsRoute)

// Listen on port
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})