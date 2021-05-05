import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const mongod = new MongoMemoryServer({ binary: { version: '4.0.14' } })

export const connect = async () => {
  const uri = await mongod.getUri()

  await mongoose.connect(uri, { useNewUrlParser: true })
  mongoose.set('debug', true)
}

export const closeDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export const clearDB = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
