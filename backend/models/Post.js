const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    name: { type: String },
    avatar: { type: String },
    title: { type: String, max: [30], required: true },
    text: { type: String, max: [1000], required: true },
    imageUrl: { type: String },
    url: { type: String },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        text: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
)

module.exports = Post = mongoose.model('post', PostSchema)
