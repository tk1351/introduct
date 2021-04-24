import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Navbar from '../../../components/layout/Navbar'
import { Router, Link } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'

afterEach(() => cleanup())

// describe('Rendering', () => {
//   let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         auth: authReducer,
//         alert: alertReducer,
//       },
//     })
//   })
//   it('Should render correctly', () => {
//     const history = createMemoryHistory()
//     render(
//       <Provider store={store}>
//         <Router history={history}>
//           <Navbar />
//         </Router>
//       </Provider>
//     )
//     expect(screen.getByText('Introduct')).toBeInTheDocument()
//     expect(screen.getByText('ユーザー登録')).toBeInTheDocument()
//     expect(screen.getByText('ログイン')).toBeInTheDocument()
//   })
// })

describe('Router test', () => {
  let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
      },
    })
  })
  it('Should work introduct link correctly', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    )
    expect(screen.getByLabelText('introduct')).toBeTruthy()
    userEvent.click(screen.getByLabelText('introduct'))
    expect(history.location.pathname).toBe('/')
  })
  it('Should work authLinks correctly', () => {
    const logout = jest.fn()
    render(
      <ul>
        <li>
          <a onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">ログアウト</span>
          </a>
        </li>
      </ul>
    )
    expect(screen.getByText('ログアウト')).toBeTruthy()
    userEvent.click(screen.getByText('ログアウト'))
    expect(logout).toBeCalled()
  })
  it('Should work guestLinks correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ul>
          <li>
            <Link to="/register">ユーザー登録</Link>
          </li>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
        </ul>
      </Router>
    )
    expect(screen.getByText('ログイン')).toBeTruthy()
    userEvent.click(screen.getByText('ログイン'))
    expect(history.location.pathname).toBe('/login')
    expect(screen.getByText('ユーザー登録')).toBeTruthy()
    userEvent.click(screen.getByText('ユーザー登録'))
    expect(history.location.pathname).toBe('/register')
  })
})
