const mongod = require('../../mongo')
const User = require('../../models/User')

const users = [
  {
    name: 'name dummy',
    email: 'email dummy',
    password: 'password dummy',
    avatar: 'avatar dummy',
  },
  {
    name: 'name2 dummy',
    email: 'email2 dummy',
    password: 'password2 dummy',
    avatar: 'avatar2 dummy',
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.collection.insertMany(users)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('User model test', () => {
  it('User model works correctly', async () => {
    const result = await User.find({})
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'name dummy' })])
    )
    expect(result).toHaveLength(2)
  })
})
