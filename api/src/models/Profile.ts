import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export interface ProfileModel extends Document {
  uid: string
  company: string
  website: string
  location: string
  bio: string
  social: {
    twitter: string
    facebook: string
    linkedin: string
    instagram: string
    youtube: string
  }
  createdAt: Date
  updatedAt: Date
}

const ProfileSchema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
      required: true,
    },
    social: {
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

export default mongoose.model<ProfileModel>('profile', ProfileSchema)
