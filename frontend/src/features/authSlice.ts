import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AsyncThunkConfig } from '../app/store'
import setAuthToken from '../utils/setAuthToken'

// 仮作成
export interface RegisterUser {
  name: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface AuthUser {
  _id: string
  name: string
  avatar: string
  role: string
}

export interface MyKnownError {
  msg: string
}

export interface AuthState {
  auth: {
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    user: AuthUser | null
  }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: MyKnownError[] | null
}

const initialState: AuthState = {
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk<
  { token: string; user: AuthUser },
  RegisterUser,
  AsyncThunkConfig<MyKnownError[]>
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const url = '/api/v1/users'
    const res = await axios.post<{
      token: string
      userId: string
      avatar: string
      role: string
    }>(url, userData)
    localStorage.setItem('token', res.data.token)
    const token = res.data.token
    const user = {
      _id: res.data.userId,
      name: userData.name,
      avatar: res.data.avatar,
      role: res.data.role,
    }
    return { token, user }
  } catch (err) {
    localStorage.removeItem('token')
    return rejectWithValue(err.response.data)
  }
})

export const loadUser = createAsyncThunk<
  { user: AuthUser },
  void,
  AsyncThunkConfig<MyKnownError[]>
>('auth/loadUser', async (_, { rejectWithValue }) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const url = '/api/v1/auth'
    const res = await axios.get<AuthUser>(url)
    const user = {
      _id: res.data._id,
      name: res.data.name,
      avatar: res.data.avatar,
      role: res.data.role,
    }
    return { user }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const loginUser = createAsyncThunk<
  { token: string; user: AuthUser },
  LoginUser,
  AsyncThunkConfig<MyKnownError[]>
>('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const url = '/api/v1/auth'
    const res = await axios.post<{
      token: string
      userId: string
      name: string
      avatar: string
      role: string
    }>(url, userData)
    localStorage.setItem('token', res.data.token)
    const token = res.data.token
    const user = {
      _id: res.data.userId,
      name: res.data.name,
      avatar: res.data.avatar,
      role: res.data.role,
    }
    return { token, user }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ユーザー登録
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
      state.auth.isAuthenticated = true
      state.auth.loading = false
      state.auth.token = action.payload.token
      state.auth.user = action.payload.user
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.auth.isAuthenticated = false
        state.auth.loading = false
        state.auth.token = null
        state.auth.user = null
      }
    })
    // ユーザーのload
    builder.addCase(loadUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
      state.auth.isAuthenticated = true
      state.auth.loading = false
      state.auth.token = localStorage.getItem('token')
      state.auth.user = action.payload.user
    })
    builder.addCase(loadUser.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.auth.isAuthenticated = false
        state.auth.loading = false
        state.auth.token = null
        state.auth.user = null
      }
    })
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
      state.auth.isAuthenticated = true
      state.auth.loading = false
      state.auth.token = action.payload.token
      state.auth.user = action.payload.user
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.auth.isAuthenticated = false
        state.auth.loading = false
        state.auth.token = null
        state.auth.user = null
      }
    })
  },
})

export default authSlice.reducer
