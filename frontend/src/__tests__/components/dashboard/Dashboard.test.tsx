import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Dashboard from '../../../components/dashboard/Dashboard'
import { Provider } from 'react-redux'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, { ProfileState } from '../../../features/profileSlice'
import { Router, RouteComponentProps } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(() => cleanup())

const mockRouteComponentProps = {
  history: {},
  location: {},
  match: {},
} as RouteComponentProps

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
  it('Should rendering correctly', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
          <Dashboard {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    expect(screen.getByText(/ようこそ/i)).toBeTruthy()
    expect(screen.getByText(/プロフィールが設定されていません/i)).toBeTruthy()
    expect(screen.getByLabelText('link')).toBeTruthy()
  })
})

describe('Router test', () => {
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
  it('Should work create-profile link correctly', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
          <Dashboard {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    userEvent.click(screen.getByLabelText('link'))
    expect(history.location.pathname).toBe('/create-profile')
  })
})

describe('API Mock Test', () => {
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
  it('[Delete success] Should dispatch correctly', () => {
    const deleteAccount = jest.fn()
    render(
      <Provider store={store}>
        <div className="my-2">
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fas fa-user-minus"></i> アカウントの削除
          </button>
        </div>
      </Provider>
    )
    userEvent.click(screen.getByRole('button'))
    expect(deleteAccount).toBeCalled()
  })
})
