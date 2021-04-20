import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Landing: FC = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Introduct</h1>
          <p className="lead">お勧め製品を紹介しよう</p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
              aria-label="register"
            >
              ユーザー登録
            </Link>
            <Link to="/login" className="btn btn-light" aria-label="login">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing