import React, { Fragment } from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfileAbout from '../../../components/profile/ProfileAbout'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, {
  ProfileState,
  ProfileData,
} from '../../../features/profileSlice'
import { Provider } from 'react-redux'

beforeEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
}>

const dummyProfile: ProfileData = {
  uid: {
    _id: 'dummy_id',
    name: 'dummy name',
    avatar: 'dummy avatar',
  },
  company: 'dummy company',
  website: 'dummy website',
  location: 'dummy location',
  bio: 'dummy bio',
  createdAt: new Date(),
  updatedAt: new Date(),
  social: {
    twitter: 'dummy twitter',
    linkedin: 'dummy linkedin',
    facebook: 'dummy facebook',
    instagram: 'dummy instagram',
    youtube: 'dummy youtube',
  },
}

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
        <ProfileAbout profile={dummyProfile} />
      </Provider>
    )
    expect(screen.getByRole('heading')).toBeTruthy()
    expect(screen.getByText('dummy bio')).toBeTruthy()
  })
})
