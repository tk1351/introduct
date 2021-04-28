import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@mongo/introduct`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
