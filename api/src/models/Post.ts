import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export interface PostModel extends Document {
  _id: string
  uid: string
  name: string
  avatar: string
  title: string
  text: string
  imageUrl: string
  url: string
  likes: { uid: string }[]
  comments: {
    uid: string
    text: string
    name: string
    avatar: string
    date: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

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
        uid: { type: Schema.Types.ObjectId, ref: 'user' },
      },
    ],
    comments: [
      {
        uid: { type: Schema.Types.ObjectId, ref: 'user' },
        text: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<PostModel>('post', PostSchema)
