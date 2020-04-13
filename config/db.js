const mongoose = require('mongoose')

const db = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.log(err.msg)
    process.exit(1)
  }
}

module.exports = connectDB