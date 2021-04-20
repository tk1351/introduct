import React, { FC, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Login: FC = () => {
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
    console.log('Success')
  }

  return (
    <Fragment>
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
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="パスワード"
            name="password"
            minLength={6}
            value={password}
            onChange={(e) => onChange(e)}
            required
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