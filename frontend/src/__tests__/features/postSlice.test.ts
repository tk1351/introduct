import reducer, {
  PostState,
  fetchAllPosts,
  PostData,
} from '../../features/postSlice'
import { MyKnownError } from '../../features/authSlice'

describe('postReducer test', () => {
  describe('fetchAllPosts', () => {
    const initialState: PostState = {
      post: null,
      posts: [],
      loading: true,
      status: 'idle',
      error: null,
    }
    it('[fetchAllPosts.pending] Should return status', () => {
      const action = { type: fetchAllPosts.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[fetchAllPosts.fulfilled] Should state include posts', () => {
      const dummyData: PostData[] = [
        {
          _id: 'dummy_id',
          uid: 'dummy uid',
          name: 'dummy name',
          avatar: 'dummy avatar',
          title: 'dummy title',
          text: 'dummy text',
          imageUrl: 'dummy imageUrl',
          url: 'dummy url',
          likes: [{ uid: 'dummy uid' }],
          comments: [
            {
              _id: 'dummy_id',
              uid: 'dummy uid',
              text: 'dummy text',
              name: 'dummy name',
              avatar: 'dummy avatar',
              date: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'dummy_id2',
          uid: 'dummy uid2',
          name: 'dummy name2',
          avatar: 'dummy avatar2',
          title: 'dummy title2',
          text: 'dummy text2',
          imageUrl: 'dummy imageUrl2',
          url: 'dummy url2',
          likes: [{ uid: 'dummy uid2' }],
          comments: [
            {
              _id: 'dummy_id2',
              uid: 'dummy uid2',
              text: 'dummy text2',
              name: 'dummy name2',
              avatar: 'dummy avatar2',
              date: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      const action = {
        type: fetchAllPosts.fulfilled.type,
        payload: { posts: dummyData },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.posts).toEqual(dummyData)
      expect(state.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[fetchAllPosts.rejected] Should return error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: fetchAllPosts.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.error).toEqual(dummyMsg)
      expect(state.posts).toHaveLength(0)
      expect(state.loading).toBeFalsy()
    })
  })
})
