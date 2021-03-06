import React, { FC, Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert from '../layout/Alert'
import {
  registerUser,
  MyKnownError,
  RegisterUser,
  selectIsAuthenticated,
} from '../../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Register: FC = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== password2) {
      const id = uuidv4()
      dispatch(
        setAlert({
          id,
          msg: '確認用パスワードが異なります',
          alertType: 'danger',
        })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 5000)
    } else {
      const userData: RegisterUser = { name, email, password }
      const resultAction = await dispatch(registerUser(userData))

      if (registerUser.fulfilled.match(resultAction)) {
        unwrapResult(resultAction)
      } else if (registerUser.rejected.match(resultAction)) {
        const payloads = resultAction.payload as MyKnownError[]
        payloads.map((payload) => {
          const id = uuidv4()
          dispatch(setAlert({ id, msg: payload.msg, alertType: 'danger' }))
          setTimeout(() => dispatch(removeAlert({ id })), 5000)
        })
      }
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
      <h1 className="large text-primary">ユーザー登録</h1>
      <p className="lead">
        <i className="fas fa-user"></i>アカウントを作成する
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)} aria-label="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="ユーザー名"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="メールアドレス"
            name="email"
            value={email}
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
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="確認用パスワード"
            name="password2"
            value={password2}
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
      <p className="my-1">
        既にアカウントを持っていますか？ <Link to="/login">ログイン</Link>
      </p>
    </Fragment>
  )
}

export default Register
