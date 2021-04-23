import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Register from '../../../components/auth/Register'
import { BrowserRouter as Router } from 'react-router-dom'
import authReducer, {
  RegisterUser,
  AuthState,
  AuthUser,
} from '../../../features/authSlice'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import alertReducer, { AlertState } from '../../../features/alertSlice'

const server = setupServer(
  rest.post<
    RegisterUser,
    {
      token: string
      userData: AuthUser
    }
  >('/api/v1/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userData: {
          _id: 'dummy id',
          name: 'dummy name',
          avatar: 'dummy avatar',
        },
        token: 'dummy token',
      })
    )
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterEach(() => server.close())

describe('Rendering', () => {
  let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
      },
    })
  })
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    )
    expect(screen.getByText('ユーザー登録')).toBeInTheDocument()
    expect(screen.getByText('アカウントを作成する')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ユーザー名')).toBeTruthy()
    expect(screen.getByPlaceholderText('メールアドレス')).toBeTruthy()
    expect(
      screen.getByText(
        'Gravatarを使用している場合は、Gravatarのメールアドレスを入力してください'
      )
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('パスワード')).toBeTruthy()
    expect(screen.getByPlaceholderText('確認用パスワード')).toBeTruthy()
    expect(screen.getByDisplayValue('登録')).toBeInTheDocument()
    expect(
      screen.getByText('既にアカウントを持っていますか？')
    ).toBeInTheDocument()
  })
})

describe('Input form onChange event', () => {
  let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
      },
    })
  })
  it('Should update input value correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    )
    const inputName = screen.getByPlaceholderText(
      'ユーザー名'
    ) as HTMLInputElement
    const inputEmail = screen.getByPlaceholderText(
      'メールアドレス'
    ) as HTMLInputElement
    const inputPwd = screen.getByPlaceholderText(
      'パスワード'
    ) as HTMLInputElement
    const inputConfirmPwd = screen.getByPlaceholderText(
      '確認用パスワード'
    ) as HTMLInputElement
    userEvent.type(inputName, 'dummy name')
    userEvent.type(inputEmail, 'dummy@example.com')
    userEvent.type(inputPwd, 'testtest')
    userEvent.type(inputConfirmPwd, 'testtest')

    expect(inputName.value).toEqual('dummy name')
    expect(inputEmail.value).toEqual('dummy@example.com')
    expect(inputPwd.value).toEqual('testtest')
    expect(inputConfirmPwd.value).toEqual('testtest')
  })
})

describe('API Mock Test', () => {
  let store: EnhancedStore<{ auth: AuthState; alert: AlertState[] }>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        alert: alertReducer,
      },
    })
  })
  it('[Post success] Should dispatch correctly', () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    render(
      <Provider store={store}>
        <form className="form" onSubmit={(e) => onSubmit(e)} aria-label="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="ユーザー名"
              name="name"
              value="dummy name"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="メールアドレス"
              name="email"
              value="dummy email"
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Gravatarを使用している場合は、Gravatarのメールアドレスを入力してください
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="パスワード"
              name="password"
              value="dummypwd"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="確認用パスワード"
              name="password2"
              value="dummypwd"
              onChange={(e) => onChange(e)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="登録"
            aria-label="input"
          />
        </form>
      </Provider>
    )
    fireEvent.submit(screen.getByLabelText('input'))
    expect(onSubmit).toBeCalled()
  })
  it('allows the user to register', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    )
    userEvent.type(screen.getByPlaceholderText('ユーザー名'), 'dummy name')
    userEvent.type(
      screen.getByPlaceholderText('メールアドレス'),
      'dummy@example.com'
    )
    userEvent.type(screen.getByPlaceholderText('パスワード'), 'testtest')
    userEvent.type(screen.getByPlaceholderText('確認用パスワード'), 'testtest')
    fireEvent.submit(screen.getByLabelText('input'))
    //TODO: 成否を判定
  })
  it('handles register exception', async () => {
    server.use(
      rest.post('/api/v1/users', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ msg: '確認用パスワードが異なります' })
        )
      })
    )
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    )
    userEvent.type(screen.getByPlaceholderText('ユーザー名'), 'dummy name')
    userEvent.type(
      screen.getByPlaceholderText('メールアドレス'),
      'dummy@example.com'
    )
    userEvent.type(screen.getByPlaceholderText('パスワード'), 'testtest')
    userEvent.type(screen.getByPlaceholderText('確認用パスワード'), 'testtest')
    //TODO: 成否を判定
  })
})
