import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CreateProfile from '../../../components/profile-form/CreateProfile'
import authReducer, { AuthState } from '../../../features/authSlice'
import alertReducer, { AlertState } from '../../../features/alertSlice'
import profileReducer, { ProfileState } from '../../../features/profileSlice'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom'

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
  it('Should render form correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateProfile {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    expect(screen.getByPlaceholderText(/会社名/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Webサイト/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/住所/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/自己紹介/)).toBeTruthy()
  })
  it('Should work toggleButton correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateProfile {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    const button = screen.getByLabelText('button')
    userEvent.click(button)
    expect(screen.getByPlaceholderText(/Twitter/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Facebook/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Linkedin/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Instagram/)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Youtube/)).toBeTruthy()
  })
})

describe('Input form onChange event', () => {
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
  it('Should update input value correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateProfile {...mockRouteComponentProps} />
        </Router>
      </Provider>
    )
    const inputCompanyValue = screen.getByPlaceholderText(
      /会社名/
    ) as HTMLInputElement
    const inputWebsiteValue = screen.getByPlaceholderText(
      /Webサイト/
    ) as HTMLInputElement
    const inputLocationValue = screen.getByPlaceholderText(
      /住所/
    ) as HTMLInputElement
    const inputBioValue = screen.getByPlaceholderText(
      /自己紹介/
    ) as HTMLInputElement
    userEvent.type(inputCompanyValue, 'dummy company')
    userEvent.type(inputWebsiteValue, 'dummy website')
    userEvent.type(inputLocationValue, 'dummy location')
    userEvent.type(inputBioValue, 'dummy bio')
    expect(inputCompanyValue.value).toBe('dummy company')
    expect(inputWebsiteValue.value).toBe('dummy website')
    expect(inputLocationValue.value).toBe('dummy location')
    expect(inputBioValue.value).toBe('dummy bio')

    const button = screen.getByLabelText('button')
    userEvent.click(button)
    const inputTwitterValue = screen.getByPlaceholderText(
      /Twitter/
    ) as HTMLInputElement
    const inputFacebookValue = screen.getByPlaceholderText(
      /Facebook/
    ) as HTMLInputElement
    const inputLinkedinValue = screen.getByPlaceholderText(
      /Linkedin/
    ) as HTMLInputElement
    const inputInstagramValue = screen.getByPlaceholderText(
      /Instagram/
    ) as HTMLInputElement
    const inputYoutubeValue = screen.getByPlaceholderText(
      /Youtube/
    ) as HTMLInputElement
    userEvent.type(inputTwitterValue, 'dummy twitter')
    userEvent.type(inputFacebookValue, 'dummy facebook')
    userEvent.type(inputLinkedinValue, 'dummy linkedin')
    userEvent.type(inputInstagramValue, 'dummy instagram')
    userEvent.type(inputYoutubeValue, 'dummy youtube')
    expect(inputTwitterValue.value).toBe('dummy twitter')
    expect(inputFacebookValue.value).toBe('dummy facebook')
    expect(inputLinkedinValue.value).toBe('dummy linkedin')
    expect(inputInstagramValue.value).toBe('dummy instagram')
    expect(inputYoutubeValue.value).toBe('dummy youtube')
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
  it('[Post success] Should dispatch correctly', () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    render(
      <Provider store={store}>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="会社名"
              name="company"
              value="dummy company"
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              所属している会社名をご記入ください
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Webサイト"
              name="website"
              value="dummy website"
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">会社HPのURLをご記入ください</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="住所"
              name="location"
              value="dummy location"
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              住所をご記入ください（例：東京都千代田区）
            </small>
          </div>
          <div className="form-group">
            <textarea
              name="bio"
              placeholder="* 自己紹介"
              value="dummy bio"
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className="form-text">自己紹介をご記入ください</small>
          </div>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter URL"
              name="twitter"
              value="dummy twitter"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              value="dummy facebooks"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
              value="dummy linkedin"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              value="dummy instagram"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="Youtube URL"
              name="youtube"
              value="dummy youtube"
              onChange={(e) => onChange(e)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary my-1"
            aria-label="input"
          />
        </form>
      </Provider>
    )
    fireEvent.submit(screen.getByLabelText('input'))
    expect(onSubmit).toBeCalled()
  })
})
