import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export interface UserModel extends Document {
  name: string
  email: string
  password: string
  avatar: string
  role: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model<UserModel>('user', UserSchema)
