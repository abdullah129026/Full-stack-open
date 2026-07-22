const mongoose = require('mongoose')

const mongodbUri = process.env.MONGODB_URI

let isConnected = false

if (mongodbUri) {
  console.log('Attempting to connect to MongoDB...')
  mongoose.connect(mongodbUri)
    .then(() => {
      console.log('✓ Connected to MongoDB Atlas')
      isConnected = true
    })
    .catch(error => {
      console.warn('✗ MongoDB connection failed:', error.message)
      console.warn('⚠️  Falling back to in-memory storage')
      isConnected = false
    })
} else {
  console.warn('MONGODB_URI not set. Using in-memory storage.')
  isConnected = false
}

module.exports = { mongoose, isConnected }
