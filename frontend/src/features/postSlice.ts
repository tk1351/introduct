import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { MyKnownError } from './authSlice'
import { AsyncThunkConfig, RootState } from '../app/store'

export interface PostData {
  _id: string
  uid: string
  name: string
  avatar: string
  title: string
  text: string
  imageUrl: string
  url: string
  likes: { uid: string }[]
  comments: {
    _id?: string
    uid: string
    text: string
    name: string
    avatar: string
    date: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface PostState {
  post: PostData | null
  posts: PostData[]
  loading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: MyKnownError[] | null
}

const initialState: PostState = {
  post: null,
  posts: [],
  loading: true,
  status: 'idle',
  error: null,
}

export const fetchAllPosts = createAsyncThunk<
  { posts: PostData[] },
  void,
  AsyncThunkConfig<MyKnownError[]>
>('post/fetchAllPosts', async (_, { rejectWithValue }) => {
  try {
    const url = '/api/v1/posts'
    const res = await axios.get<PostData[]>(url)
    return { posts: res.data }
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 全てのpostを取得
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = action.payload.posts
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      if (action.payload) {
        state.status = 'failed'
        state.error = action.payload
        state.loading = false
        state.posts = []
      }
    })
  },
})

export const selectPostLoading = (state: RootState) => state.post.loading
export const selectAllPosts = (state: RootState) => state.post.posts

export default postSlice.reducer
