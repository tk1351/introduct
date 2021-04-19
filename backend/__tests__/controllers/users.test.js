const mongod = require('../../mongo')
const User = require('../../models/User')
const usersController = require('../../controllers/users')

beforeAll(async () => {
  await mongod.connect()
})
beforeEach(async () => {
  await User.deleteMany({})
})
afterEach(async () => {
  await mongod.clearDB()
})
afterAll(async () => {
  await mongod.closeDB()
})

describe('registerUser', () => {
  it('should register', async () => {
    const testUser = {
      body: {
        name: 'dummy name',
        email: 'dummy email',
        avatarUrl: 'dummy avatarUrl',
        password: 'dummy password',
      },
    }
    expect(
      async () => await usersController.registerUser(testUser)
    ).not.toThrow()
  })
  // it('should not register', async () => {
  //   const testUser = {
  //     body: {
  //       name: 'dummy name',
  //       avatarUrl: 'dummy avatarUrl',
  //       password: 'dummy password',
  //     },
  //   }
  //   expect(async () => await usersController.registerUser(testUser)).toThrow()
  // })
})
