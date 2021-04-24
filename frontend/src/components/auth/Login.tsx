import React, { FC, useState, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  LoginUser,
  loginUser,
  loadUser,
  MyKnownError,
  selectIsAuthenticated,
} from '../../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { setAlert, removeAlert } from '../../features/alertSlice'
import Alert from '../layout/Alert'

const Login: FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userData: LoginUser = { email, password }
    const resultAction = await dispatch(loginUser(userData))

    if (loginUser.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      dispatch(loadUser())
    } else if (loginUser.rejected.match(resultAction)) {
      const payloads = resultAction.payload as MyKnownError[]
      payloads.map((payload) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: payload.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }

  // login済みであればリダイレクトする
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <Alert />
      <h1 className="large text-primary" aria-label="h1">
        ログイン
      </h1>
      <p className="lead">
        <i className="fas fa-user">アカウントへログインする</i>
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="メールアドレス"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="ログイン" />
      </form>
      <p className="my-1">
        アカウントを持っていませんか? <Link to="/register">ユーザー登録</Link>
      </p>
    </Fragment>
  )
}

export default Login
