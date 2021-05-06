import React from 'react'
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
import { Router, RouteComponentProps, match } from 'react-router-dom'
import { createMemoryHistory } from 'history'

let store: EnhancedStore<{
  auth: AuthState
  alert: AlertState[]
  profile: ProfileState
}>

const history = createMemoryHistory()
const path = '/profile/:id'

const mockRouteComponentProps = {
  history: {},
  location: {},
  match: { params: { id: 'dummy_id' } },
} as RouteComponentProps<{ id: string }>

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
        <Router history={history}>
          <Profile {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    screen.debug()
    console.log({ ...mockRouteComponentProps })
  })
})
