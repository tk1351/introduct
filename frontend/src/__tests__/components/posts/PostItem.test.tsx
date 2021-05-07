import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostItem from '../../../components/posts/PostItem'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, { ProfileState } from '../../../features/profileSlice'
import postReducer, { PostState, PostData } from '../../../features/postSlice'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

beforeEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
  post: PostState
}>

const history = createMemoryHistory()

const dummyPost: PostData = {
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
}

describe('Rendering', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
        post: postReducer,
      },
    })
  })
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PostItem post={dummyPost} />
        </Router>
      </Provider>
    )
    expect(screen.getByText('dummy name')).toBeInTheDocument()
    expect(screen.getByText('dummy title')).toBeInTheDocument()
    expect(screen.getByText('dummy text')).toBeInTheDocument()
    expect(screen.getByText(/Posted on/i)).toBeInTheDocument()
  })
})

describe('Router test', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
        post: postReducer,
      },
    })
  })
  it('Should work comment link correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PostItem post={dummyPost} />
        </Router>
      </Provider>
    )
    expect(screen.getByLabelText('commentLink')).toBeTruthy()
    userEvent.click(screen.getByLabelText('commentLink'))
    expect(history.location.pathname).toBe('/post/dummy_id')
  })
})
