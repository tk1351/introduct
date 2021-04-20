import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Register from '../../../components/auth/Register'
import { BrowserRouter as Router } from 'react-router-dom'

afterEach(() => cleanup())

describe('Rendering', () => {
  it('Should render correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
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
  it('Should update input value correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    )
    const inputNameValue = screen.getByPlaceholderText(
      'ユーザー名'
    ) as HTMLInputElement
    const inputEmailValue = screen.getByPlaceholderText(
      'メールアドレス'
    ) as HTMLInputElement
    const inputPasswordValue = screen.getByPlaceholderText(
      'パスワード'
    ) as HTMLInputElement
    const inputConfirmPasswordValue = screen.getByPlaceholderText(
      '確認用パスワード'
    ) as HTMLInputElement
    userEvent.type(inputNameValue, 'test')
    userEvent.type(inputEmailValue, 'test@example.com')
    userEvent.type(inputPasswordValue, 'testtest')
    userEvent.type(inputConfirmPasswordValue, 'testtest')
    expect(inputNameValue.value).toBe('test')
    expect(inputEmailValue.value).toBe('test@example.com')
    expect(inputPasswordValue.value).toBe('testtest')
    expect(inputConfirmPasswordValue.value).toBe('testtest')
  })
})
