import React, { Fragment } from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Profile from '../../../components/profile/Profile'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, {
  ProfileState,
  ProfileData,
} from '../../../features/profileSlice'
import { Provider } from 'react-redux'
import { Router, RouteComponentProps, Link } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Spinner from '../../../components/layout/Spinner'
import userEvent from '@testing-library/user-event'

beforeEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
}>

const history = createMemoryHistory()

const mockRouteComponentProps = {
  history: {},
  location: {},
  match: { params: { id: 'dummy_id' } },
} as RouteComponentProps<{ id: string }>

const authState: AuthState = {
  auth: {
    token: 'dummy token',
    isAuthenticated: true,
    loading: false,
    user: {
      _id: 'dummy_id',
      name: 'dummy name',
      avatar: 'dummy avatar',
      role: 'dummy role',
    },
  },
  status: 'succeeded',
  error: null,
}
const auth = authState.auth

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
const profileState: ProfileState = {
  profile: dummyProfile,
  profiles: [],
  loading: false,
  status: 'succeeded',
  error: null,
}

const profile = dummyProfile
const loading = profileState.loading

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
  it('Should render Spinner correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Profile {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    expect(screen.getByRole('img')).toBeTruthy()
  })
  it('Should render edit-profile Link correctly when profile loading', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            {profile === null || loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <Link
                  to="/profiles"
                  className="btn btn-light"
                  aria-label="goback"
                >
                  戻る
                </Link>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user?._id === profile.uid._id && (
                    <Link
                      to="/edit-profile"
                      className="btn btn-datk"
                      aria-label="edit"
                    >
                      プロフィールを編集する
                    </Link>
                  )}
              </Fragment>
            )}
          </Fragment>
        </Router>
      </Provider>
    )
    expect(screen.getByLabelText('goback')).toBeTruthy()
    expect(screen.getByLabelText('edit')).toBeTruthy()
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
  it('Should GoBack Link works correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            {profile === null || loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <Link
                  to="/profiles"
                  className="btn btn-light"
                  aria-label="goback"
                >
                  戻る
                </Link>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user?._id === profile.uid._id && (
                    <Link
                      to="/edit-profile"
                      className="btn btn-datk"
                      aria-label="edit"
                    >
                      プロフィールを編集する
                    </Link>
                  )}
              </Fragment>
            )}
          </Fragment>
        </Router>
      </Provider>
    )
    userEvent.click(screen.getByLabelText('goback'))
    expect(history.location.pathname).toBe('/profiles')
    userEvent.click(screen.getByLabelText('edit'))
    expect(history.location.pathname).toBe('/edit-profile')
  })
})
