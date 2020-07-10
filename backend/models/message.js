import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = new mongoose.model('Message', MessageSchema)