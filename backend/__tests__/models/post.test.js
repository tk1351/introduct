const mongod = require('../../mongo')
const Post = require('../../models/Post')

const posts = [
  {
    user: 'dummy user',
    name: 'dummy name',
    avatar: 'dummy avatar',
    title: 'dummy title',
    text: 'dummy text',
    imageUrl: 'dummy imageUrl',
    url: 'dummy url',
    likes: [],
    comments: [],
  },
  {
    user: 'dummy user2',
    name: 'dummy name2',
    avatar: 'dummy avatar2',
    title: 'dummy title2',
    text: 'dummy text2',
    imageUrl: 'dummy imageUrl2',
    url: 'dummy url2',
    likes: [],
    comments: [],
  },
]

beforeAll(async () => {
  await mongod.connect()
})

beforeEach(async () => {
  await Post.deleteMany({})
  await Post.collection.insertMany(posts)
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Post model test', () => {
  it('Post model works correctly', async () => {
    const result = await Post.find({})
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'dummy name' })])
    )
    expect(result).toHaveLength(2)
  })
})
