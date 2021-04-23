import reducer, {
  registerUser,
  AuthState,
  MyKnownError,
  loadUser,
  loginUser,
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
        user: {
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
      expect(state.auth.user).toEqual(dummyData.user)
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
  describe('loadUser', () => {
    const initialState: AuthState = {
      auth: {
        token: 'dummy token',
        isAuthenticated: true,
        loading: false,
        user: {
          _id: '',
          name: '',
          avatar: '',
          role: '',
        },
      },
      status: 'succeeded',
      error: null,
    }
    it('[loadUser.pending] Should status return loading', () => {
      const action = { type: loadUser.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[loadUser.fulfilled] Should user include', () => {
      const action = {
        type: loadUser.fulfilled.type,
        payload: initialState.auth.user,
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.auth.isAuthenticated).toBeTruthy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.error).toBeNull()
    })
    it('[loadUser.rejected] Should error include', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: loadUser.rejected.type, payload: dummyMsg }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.auth.isAuthenticated).toBeFalsy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.auth.token).toBeNull()
      expect(state.auth.user).toBeNull()
      expect(state.error).toEqual(dummyMsg)
    })
  })
  describe('loginUser', () => {
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
    it('[loginUser.pending] Should status return loading', () => {
      const action = { type: loginUser.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    })
    it('[loginUser.fulfilled] Should include token and user', () => {
      const dummyData = {
        token: 'dummy token',
        user: {
          _id: 'dummy id',
          name: 'dummy name',
          avatar: 'dummy avatar',
          role: 'dummy role',
        },
      }
      const action = { type: loginUser.fulfilled.type, payload: dummyData }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('succeeded')
      expect(state.auth.isAuthenticated).toBeTruthy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.auth.token).toEqual(dummyData.token)
      expect(state.auth.user).toEqual(dummyData.user)
      expect(state.error).toBeNull()
    })
    it('[loginUser.rejected] Should include error', () => {
      const dummyMsg: MyKnownError = { msg: 'dummy error' }
      const action = { type: loginUser.rejected.type, payload: dummyMsg }
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
