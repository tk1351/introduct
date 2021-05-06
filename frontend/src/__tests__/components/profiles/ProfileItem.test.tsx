import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfileItem from '../../../components/profiles/ProfileItem'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, {
  ProfileState,
  ProfileData,
} from '../../../features/profileSlice'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'

beforeEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
}>

const dummyProfile: ProfileData = {
  uid: {
    _id: 'dummy _id',
    name: 'dummy name',
    avatar: 'dummy avatar',
  },
  company: 'dummy company',
  website: 'dummy website',
  location: 'dummy location',
  bio: 'dummy bio',
  social: {
    twitter: 'dummy twitter',
    facebook: 'dummy facebook',
    linkedin: 'dummy linkedin',
    instagram: 'dummy instagram',
    youtube: 'dummy youtube',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}
const history = createMemoryHistory()

describe('Rendering', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
      },
    })
  })
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProfileItem profile={dummyProfile} />
        </Router>
      </Provider>
    )
    expect(screen.getByText('dummy name')).toBeTruthy()
  })
})

describe('Router test', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
        profile: profileReducer,
      },
    })
  })
  it('Should work link correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProfileItem profile={dummyProfile} />
        </Router>
      </Provider>
    )
    expect(screen.getByRole('link')).toBeTruthy()
    userEvent.click(screen.getByRole('link'))
    expect(history.location.pathname).toBe('/profile/dummy _id')
  })
})
