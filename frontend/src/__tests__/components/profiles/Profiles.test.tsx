import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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
    const dummyProfiles: Profile[] = [
      {
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
      },
      {
        uid: {
          _id: 'dummy _id2',
          name: 'dummy name2',
          avatar: 'dummy avatar2',
        },
        company: 'dummy company2',
        website: 'dummy website2',
        location: 'dummy location2',
        bio: 'dummy bio2',
        social: {
          twitter: 'dummy twitter2',
          facebook: 'dummy facebook2',
          linkedin: 'dummy linkedin2',
          instagram: 'dummy instagram2',
          youtube: 'dummy youtube2',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    render(
      <Provider store={store}>
        <Router>
          <h1 className="large text-primary">プロフィール</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> 登録者と繋がろう
          </p>
          <div className="profiles">
            {dummyProfiles.length > 0 ? (
              dummyProfiles.map((dummyProfile) => (
                <div className="profile bg-light" key={dummyProfile.uid._id}>
                  <img src={dummyProfile.uid.avatar} className="round-img" />
                  <div>
                    <h2>{dummyProfile.uid.name}</h2>
                    <p>
                      {dummyProfile.company && (
                        <span>企業： {dummyProfile.company}</span>
                      )}
                    </p>
                    <p className="my-1">
                      {dummyProfile.location && (
                        <span>住所： {dummyProfile.location}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h4>登録者はいません</h4>
            )}
          </div>
        </Router>
      </Provider>
    )
    expect(screen.getByText('dummy name')).toBeTruthy()
    expect(screen.getByText('dummy name2')).toBeTruthy()
  })
})
