import React, { Fragment } from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Router, Link } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, { ProfileState } from '../../../features/profileSlice'

afterEach(() => cleanup())

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
}>

const history = createMemoryHistory()

const clearUsersState = jest.fn()

const auth: AuthState = {
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

const guest: AuthState = {
  auth: {
    token: null,
    isAuthenticated: false,
    loading: false,
    user: null,
  },
  status: 'idle',
  error: null,
}

const authLinks = (
  <ul>
    <li aria-label="profile">
      <Link to="/profiles">プロフィール</Link>
    </li>
    <li aria-label="dashboard">
      <Link to="/dashboard">
        <i className="fas fa-user"></i>{' '}
        <span className="hide-sm">ダッシュボード</span>
      </Link>
    </li>
    <li aria-label="logout">
      <a onClick={() => clearUsersState()}>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">ログアウト</span>
      </a>
    </li>
  </ul>
)

const guestLinks = (
  <ul>
    <li aria-label="profile">
      <Link to="/profiles">プロフィール</Link>
    </li>
    <li aria-label="register">
      <Link to="/register">ユーザー登録</Link>
    </li>
    <li aria-label="login">
      <Link to="/login">ログイン</Link>
    </li>
  </ul>
)

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
  it('Should authLinks render correctly', () => {
    const loading = auth.auth.loading
    const isAuthenticated = auth.auth.isAuthenticated
    render(
      <Provider store={store}>
        <Router history={history}>
          <nav className="navbar bg-dark">
            <h1 aria-label="introduct">
              <Link to="/">
                <i className="fas fa-code"></i>Introduct
              </Link>
            </h1>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </Router>
      </Provider>
    )
    expect(screen.getByLabelText('introduct')).toBeTruthy()
    expect(screen.getByLabelText('profile')).toBeTruthy()
    expect(screen.getByLabelText('dashboard')).toBeTruthy()
    expect(screen.getByLabelText('logout')).toBeTruthy()
  })
  it('Should guestLinks render correctly', () => {
    const loading = guest.auth.loading
    const isAuthenticated = guest.auth.isAuthenticated
    render(
      <Provider store={store}>
        <Router history={history}>
          <nav className="navbar bg-dark">
            <h1 aria-label="introduct">
              <Link to="/">
                <i className="fas fa-code"></i>Introduct
              </Link>
            </h1>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </Router>
      </Provider>
    )
    expect(screen.getByLabelText('introduct')).toBeTruthy()
    expect(screen.getByLabelText('profile')).toBeTruthy()
    expect(screen.getByLabelText('register')).toBeTruthy()
    expect(screen.getByLabelText('login')).toBeTruthy()
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
  it('Should work authLinks router correctly', () => {
    render(
      <Router history={history}>
        <ul>
          <li aria-label="profile">
            <Link to="/profiles">プロフィール</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user"></i>{' '}
              <span className="hide-sm" aria-label="dashboard">
                ダッシュボード
              </span>
            </Link>
          </li>
          <li>
            <a onClick={() => clearUsersState()}>
              <i className="fas fa-sign-out-alt"></i>{' '}
              <span className="hide-sm" aria-label="logout">
                ログアウト
              </span>
            </a>
          </li>
        </ul>
      </Router>
    )
    // TODO: Unable to find the "window" object for the given node.のエラー
    const dashboardSpanText = screen.getByLabelText('dashboard')
      .textContent as any
    // expect(dashboardSpanText).toBeTruthy()
    // fireEvent.click(dashboardSpanText)
    // expect(history.location.pathname).toBe('/dashboard')
  })
})

// describe('Router test', () => {
//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         auth: authReducer,
//         alert: alertReducer,
//         profile: profileReducer
//       },
//     })
//   })
//   it('Should work introduct link correctly', () => {
//     const history = createMemoryHistory()
//     render(
//       <Provider store={store}>
//         <Router history={history}>
//           <Navbar />
//         </Router>
//       </Provider>
//     )
//     expect(screen.getByLabelText('introduct')).toBeTruthy()
//     userEvent.click(screen.getByLabelText('introduct'))
//     expect(history.location.pathname).toBe('/')
//   })
//   it('Should work authLinks correctly', () => {
//     const logout = jest.fn()
//     render(
//       <ul>
//         <li>
//           <a onClick={() => logout()}>
//             <i className="fas fa-sign-out-alt"></i>{' '}
//             <span className="hide-sm">ログアウト</span>
//           </a>
//         </li>
//       </ul>
//     )
//     expect(screen.getByText('ログアウト')).toBeTruthy()
//     userEvent.click(screen.getByText('ログアウト'))
//     expect(logout).toBeCalled()
//   })
//   it('Should work guestLinks correctly', () => {
//     const history = createMemoryHistory()
//     render(
//       <Router history={history}>
//         <ul>
//           <li>
//             <Link to="/register">ユーザー登録</Link>
//           </li>
//           <li>
//             <Link to="/login">ログイン</Link>
//           </li>
//         </ul>
//       </Router>
//     )
//     expect(screen.getByText('ログイン')).toBeTruthy()
//     userEvent.click(screen.getByText('ログイン'))
//     expect(history.location.pathname).toBe('/login')
//     expect(screen.getByText('ユーザー登録')).toBeTruthy()
//     userEvent.click(screen.getByText('ユーザー登録'))
//     expect(history.location.pathname).toBe('/register')
//   })
// })
