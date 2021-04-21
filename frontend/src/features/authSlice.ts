import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AsyncThunkConfig } from '../app/store'

// 仮作成
export interface UserData {
  name: string
  email: string
  password: string
}

export interface MyKnownError {
  msg: string
}

interface AuthState {
  auth: {
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    user: UserData | null
  }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: MyKnownError | null
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
  { token: string; userData: UserData },
  UserData,
  AsyncThunkConfig<MyKnownError>
>('auth/registerUser', async (userData, thunkApi) => {
  try {
    const url = '/api/v1/users'
    const res = await axios.post(url, userData)
    return { ...res.data, userData }
  } catch (err) {
    localStorage.removeItem('token')
    return thunkApi.rejectWithValue(err.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
      console.log('payload', action.payload)
      state.auth.isAuthenticated = true
      state.auth.loading = false
      state.auth.token = action.payload.token
      state.auth.user = action.payload.userData
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
  },
})

export default authSlice.reducer
