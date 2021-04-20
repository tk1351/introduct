import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Login from '../../../components/auth/Login'
import { BrowserRouter as Router } from 'react-router-dom'

afterEach(() => cleanup())

describe('Rendering', () => {
  it('Should render correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    )
    expect(screen.getByLabelText('h1')).toBeTruthy()
    expect(screen.getByText('アカウントへログインする')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('メールアドレス')).toBeTruthy()
    expect(screen.getByPlaceholderText('パスワード')).toBeTruthy()
    expect(screen.getByDisplayValue('ログイン')).toBeInTheDocument()
    expect(screen.getByText(/アカウントを持っていませんか/)).toBeInTheDocument()
  })
})

describe('Input form onChange event', () => {
  it('Should update input value correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    )
    const inputEmailValue = screen.getByPlaceholderText(
      'メールアドレス'
    ) as HTMLInputElement
    const inputPasswordValue = screen.getByPlaceholderText(
      'パスワード'
    ) as HTMLInputElement
    userEvent.type(inputEmailValue, 'test@example.com')
    userEvent.type(inputPasswordValue, 'testtest')
    expect(inputEmailValue.value).toBe('test@example.com')
    expect(inputPasswordValue.value).toBe('testtest')
  })
})
