import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import User from './models/user'
import Message from './models/message'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/code-challenge1"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080.
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Messages
const USER_CREATED = 'User created.'
const ERR_CREATE_USER = 'Could not create user.'
const ERR_NO_MESSAGES = 'There are no messages yet'
const ERR_GET_MESSAGES = 'Could not get messages'

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Messages endpoint
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()

    if (messages.length === 0) {
      res.status(200).json({ message: ERR_NO_MESSAGES })
    } else if (!messages) {
      res.status(404).json({
        message: ERR_NO_MESSAGES
      })
    } else {
      res.status(200).json({
        messages: messages
      })
    }
  } catch {
    res.status(400).json({ message: ERR_GET_MESSAGES })
  }
})

// Sign up
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body
  const encryptedPassword = bcrypt.hashSync(password)

  try {
    const user = new User({
      name,
      email,
      password: encryptedPassword,
    })
    const newUser = await user.save()

    res.status(201).json({
      message: USER_CREATED,
      user: newUser
    })
  } catch (err) {
    res.status(400).json({
      message: ERR_CREATE_USER,
      errors: err.errors
    })
  }
})

// Login existing user
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
    .populate('messages')

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json(user)
  } else {
    res.status(400).json({ notFound: true })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
