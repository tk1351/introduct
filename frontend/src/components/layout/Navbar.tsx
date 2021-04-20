import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/" aria-label="introduct">
          <i className="fas fa-code"></i>Introduct
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/register" aria-label="register">
            ユーザー登録
          </Link>
        </li>
        <li>
          <Link to="/login" aria-label="login">
            ログイン
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
