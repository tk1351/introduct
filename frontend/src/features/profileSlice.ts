import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { AuthUser, MyKnownError } from './authSlice'
import { AsyncThunkConfig, RootState } from '../app/store'

export interface Profile {
  user: AuthUser
  company: string
  website: string
  location: string
  bio: string
  social: {
    twitter: string
    facebook: string
    linkedin: string
    instagram: string
    youtube: string
  }
}

export interface ProfileState {
  profile: Profile | null
  profiles: Profile[]
  loading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: MyKnownError[] | null
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: true,
  status: 'idle',
  error: null,
}

// 返り値 userのプロフィール
export const fetchCurrentProfile = createAsyncThunk<
  { profile: Profile },
  void,
  AsyncThunkConfig<MyKnownError[]>
>('profile/fetchCurrentProfile', async (_, { rejectWithValue }) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const url = '/api/v1/profile/me'
    const res = await axios.get<Profile>(url)
    const profile = {
      user: res.data.user,
      company: res.data.company,
      website: res.data.website,
      location: res.data.location,
      bio: res.data.bio,
      social: {
        twitter: res.data.social.twitter,
        facebook: res.data.social.facebook,
        linkedin: res.data.social.linkedin,
        instagram: res.data.social.instagram,
        youtube: res.data.social.youtube,
      },
    }
    return { profile }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.status = 'idle'
      state.profile = null
      state.profiles = []
      state.loading = true
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // tokenがsetされているユーザーのprofileを取得
    builder.addCase(fetchCurrentProfile.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCurrentProfile.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile = action.payload.profile
      state.profiles = []
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchCurrentProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.profile = null
        state.profiles = []
        state.loading = false
      }
    })
  },
})

export const { clearProfile } = profileSlice.actions

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileLoading = (state: RootState) => state.profile.loading

export default profileSlice.reducer
