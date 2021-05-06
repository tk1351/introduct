import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { MyKnownError } from './authSlice'
import { AsyncThunkConfig, RootState } from '../app/store'

export interface RegisterProfile {
  company: string
  website: string
  location: string
  bio: string
  twitter: string
  facebook: string
  linkedin: string
  instagram: string
  youtube: string
}

export interface Profile {
  uid: {
    _id: string
    avatar: string
    name: string
  }
  company: string
  website: string
  location: string
  bio: string
  createdAt: Date
  updatedAt: Date
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
    return { profile: res.data }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchAllProfile = createAsyncThunk<
  { profiles: Profile[] },
  void,
  AsyncThunkConfig<MyKnownError[]>
>('profile/fetchAllProfile', async (_, { rejectWithValue }) => {
  try {
    const url = '/api/v1/profile'
    const res = await axios.get<Profile[]>(url)
    return { profiles: res.data }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// fetchProfileByUid
// { profile: Profile }
// { user_id: string }
// error

export const fetchProfileByUid = createAsyncThunk<
  { profile: Profile },
  { user_id: string },
  AsyncThunkConfig<MyKnownError[]>
>('/profile/fetchProfileByUid', async (user_id, { rejectWithValue }) => {
  try {
    const url = `/api/v1/profile/user/${user_id}`
    const res = await axios.get<Profile>(url)
    return { profile: res.data }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const createProfile = createAsyncThunk<
  { profile: Profile },
  RegisterProfile,
  AsyncThunkConfig<MyKnownError[]>
>('profile/createProfile', async (profileData, { rejectWithValue }) => {
  try {
    const url = '/api/v1/profile'
    const res = await axios.post<Profile>(url, profileData)
    return { profile: res.data }
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})

export const deleteProfile = createAsyncThunk<
  { msg: string },
  void,
  AsyncThunkConfig<MyKnownError[]>
>('profile/deleteProfile', async (_, { rejectWithValue }) => {
  try {
    const url = '/api/v1/profile'
    const res = await axios.delete<{ msg: string }>(url)
    return res.data
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
    // 全てのprofileを取得
    builder.addCase(fetchAllProfile.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAllProfile.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profiles = action.payload.profiles
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchAllProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.profiles = []
        state.loading = false
      }
    })
    // user_idごとのprofileを取得
    // TODO: 分岐処理の追加
    // profileの追加
    builder.addCase(createProfile.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.profile = action.payload.profile
      state.profiles = []
      state.loading = false
      state.error = null
    })
    builder.addCase(createProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.profile = null
        state.profiles = []
        state.loading = false
      }
    })
    // profileの削除
    builder.addCase(deleteProfile.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteProfile.fulfilled, (state) => {
      state.status = 'succeeded'
      state.profile = null
      state.loading = false
      state.error = null
    })
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.loading = false
      }
    })
  },
})

export const { clearProfile } = profileSlice.actions

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileLoading = (state: RootState) => state.profile.loading
export const selectProfiles = (state: RootState) => state.profile.profiles

export default profileSlice.reducer
