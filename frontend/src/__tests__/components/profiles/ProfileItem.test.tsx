import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfileItem from '../../../components/profiles/ProfileItem'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, {
  ProfileState,
  Profile,
} from '../../../features/profileSlice'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Rendering', () => {
  let store: EnhancedStore<{
    auth: AuthState
    alert: AlertState[]
    profile: ProfileState
  }>
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
    const dummyProfile: Profile = {
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
    render(
      <Provider store={store}>
        <Router>
          <ProfileItem profile={dummyProfile} />
        </Router>
      </Provider>
    )
    expect(screen.getByText('dummy name')).toBeTruthy()
  })
})
