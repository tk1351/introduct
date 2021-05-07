import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProfileTop from '../../../components/profile/ProfileTop'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, {
  ProfileState,
  ProfileData,
} from '../../../features/profileSlice'
import { Provider } from 'react-redux'

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
        <ProfileTop profile={dummyProfile} />
      </Provider>
    )
    const companySpanTextContent = screen.getByLabelText('company').textContent
    const locationSpanTextContent = screen.getByLabelText('location')
      .textContent

    expect(companySpanTextContent).toEqual('企業: dummy company')
    expect(locationSpanTextContent).toEqual('住所: dummy location')

    expect(screen.getByLabelText('avatar')).toBeTruthy()
    expect(screen.getByRole('heading')).toBeTruthy()
    expect(screen.getByLabelText('website')).toBeTruthy()
    expect(screen.getByLabelText('twitter')).toBeTruthy()
    expect(screen.getByLabelText('facebook')).toBeTruthy()
    expect(screen.getByLabelText('linkedin')).toBeTruthy()
    expect(screen.getByLabelText('instagram')).toBeTruthy()
    expect(screen.getByLabelText('youtube')).toBeTruthy()
  })
})
