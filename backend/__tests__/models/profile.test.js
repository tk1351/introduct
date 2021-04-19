const mongod = require('../../mongo')
const Profile = require('../../models/Profile')

const profiles = [
  {
    user: 'dummy user',
    company: 'dummy company',
    website: 'dummy website',
    location: 'dummy location',
    bio: 'dummy bio',
    social: {
      twitter: 'dummy twitter',
      facebook: 'dummy facebook',
      linkedin: 'dummy linkedin',
      instagram: 'dummy instagram',
      youtube: 'dummy youtube',
    },
  },
  {
    user: 'dummy user2',
    company: 'dummy company2',
    website: 'dummy website2',
    location: 'dummy location2',
    bio: 'dummy bio2',
    social: {
      twitter: 'dummy twitter2',
      facebook: 'dummy facebook2',
      linkedin: 'dummy linkedin2',
      instagram: 'dummy instagram2',
      youtube: 'dummy youtube2',
    },
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Profile.deleteMany({})
  await Profile.collection.insertMany(profiles)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Profile model test', () => {
  it('Profile model works correctly', async () => {
    const result = await Profile.find({})
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ company: 'dummy company2' }),
      ])
    )
    expect(result).toHaveLength(2)
  })
})
