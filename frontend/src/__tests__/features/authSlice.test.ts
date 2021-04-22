import reducer, {
  registerUser,
  AuthState,
  MyKnownError,
} from '../../features/authSlice'

describe('authReducer test', () => {
  describe('registerUser', () => {
    const initialState: AuthState = {
      auth: {
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
      },
      status: 'idle',
      error: null,
    }
    it('[registerUser.pending] Should status return loading', () => {
      const action = { type: registerUser.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[registerUser.fulfilled] Should state include token and userData', () => {
      const dummyData = {
        token: 'dummy token',
        userData: {
          name: 'dummy name',
          email: 'dummy email',
          password: 'dummy password',
        },
      }
      const action = { type: registerUser.fulfilled.type, payload: dummyData }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.auth.isAuthenticated).toBeTruthy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.auth.token).toEqual(dummyData.token)
      expect(state.auth.user).toEqual(dummyData.userData)
      expect(state.error).toBeNull()
    })
    it('[registerUser.rejected] Should state include error message', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: registerUser.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.auth.isAuthenticated).toBeFalsy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.auth.token).toBeNull()
      expect(state.auth.user).toBeNull()
      expect(state.error).toEqual(dummyMsg)
    })
  })
})
