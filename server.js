const express = require('express')
const connectDB = require('./config/db')
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const path = require('path')

// Initilize express server
const app = express()

// Connect database
connectDB()

// Init middleware to accept json as js object
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/contacts', contactsRoute)

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

// Listen on port
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})