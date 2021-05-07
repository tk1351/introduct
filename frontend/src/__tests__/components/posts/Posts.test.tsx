import React, { Fragment } from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Posts from '../../../components/posts/Posts'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, { ProfileState } from '../../../features/profileSlice'
import postReducer, { PostState, PostData } from '../../../features/postSlice'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

beforeEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
  post: PostState
}>

const history = createMemoryHistory()

const posts: PostData[] = [
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
  it('Should render Spinner correctly', () => {
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    )
    expect(screen.getByRole('img')).toBeTruthy()
  })
  it('Should render cpnt correctly', () => {
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
    render(
      <Fragment>
        <h1 className="large text-primary" aria-label="posts">
          Posts
        </h1>
        <p className="lead" aria-label="welcome">
          <i className="fas fa-user"></i> ようこそ
        </p>
        <div className="posts">
          {posts.map((post) => (
            <h4 key={post._id}>{post.name}</h4>
          ))}
        </div>
      </Fragment>
    )
    expect(screen.getByLabelText('posts')).toBeTruthy()
    expect(screen.getByLabelText('welcome')).toBeTruthy()
    expect(screen.getByText('dummy name')).toBeInTheDocument()
    expect(screen.getByText('dummy name2')).toBeInTheDocument()
  })
})
