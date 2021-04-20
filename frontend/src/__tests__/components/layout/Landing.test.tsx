import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Landing from '../../../components/layout/Landing'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(() => cleanup())

describe('Rendering', () => {
  it('Should render correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Landing />
      </Router>
    )
    expect(screen.getByText('Introduct')).toBeInTheDocument()
    expect(screen.getByText('お勧め製品を紹介しよう')).toBeInTheDocument()
    expect(screen.getByText('ユーザー登録')).toBeInTheDocument()
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })
})

describe('Router test', () => {
  it('Should work register link correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Landing />
      </Router>
    )
    expect(screen.getByLabelText('register')).toBeTruthy()
    userEvent.click(screen.getByLabelText('register'))
    expect(history.location.pathname).toBe('/register')
  })
  it('Should work login link correctly', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Landing />
      </Router>
    )
    expect(screen.getByLabelText('login')).toBeTruthy()
    userEvent.click(screen.getByLabelText('login'))
    expect(history.location.pathname).toBe('/login')
  })
})
