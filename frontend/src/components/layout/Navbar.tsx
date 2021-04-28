import React, { Fragment, FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  logout,
  selectIsAuthenticated,
  selectLoading,
} from '../../features/authSlice'
import { clearProfile } from '../../features/profileSlice'

const Navbar: FC = () => {
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loading = useAppSelector(selectLoading)

  const clearUsersState = () => {
    dispatch(clearProfile())
    dispatch(logout())
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">プロフィール</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">ダッシュボード</span>
        </Link>
      </li>
      <li>
        <a onClick={() => clearUsersState()}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">ログアウト</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">プロフィール</Link>
      </li>
      <li>
        <Link to="/register">ユーザー登録</Link>
      </li>
      <li>
        <Link to="/login">ログイン</Link>
      </li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/" aria-label="introduct">
          <i className="fas fa-code"></i>Introduct
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  )
}

export default Navbar
