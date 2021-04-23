import React from 'react'
import { render } from '@testing-library/react'
import App from '../../components/App'
import { Provider } from 'react-redux'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../../features/authSlice'
import alertReducer, { AlertState } from '../../features/alertSlice'

describe('useEffect test', () => {
  let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
      },
    })
  })
  it('Should dispatch loadUser function correctly', async () => {
    const loadUser = jest.fn()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(loadUser).not.toBeCalled()
    //TODO: awaitの処理を記述
  })
})
