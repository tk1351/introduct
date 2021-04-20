import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Alert from '../../../components/layout/Alert'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import alertReducer, { AlertState } from '../../../features/alertSlice'

describe('Alert Integration Test', () => {
  let store: EnhancedStore<{ alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        alert: alertReducer,
      },
    })
  })
  it('Should render null without alert', () => {
    render(
      <Provider store={store}>
        <Alert />
      </Provider>
    )
    expect(screen.queryByText('msg')).toBeNull()
  })
  //TODO: selectAlert state.alertから最新の一つが取れているか
  //TODO: isAlertがあるときにレンダリングされているか
})
