import React, { FC, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { useAppDispatch } from '../app/hooks'
import { loadUser } from '../features/authSlice'
import setAuthToken from '../utils/setAuthToken'
import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Register from './auth/Register'
import Login from './auth/Login'

import '../App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App: FC = () => {
  const dispatch = useAppDispatch()

  const isAuthenticated = async () => {
    const resultAction = await dispatch(loadUser())
    if (loadUser.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
    }
  }
  useEffect(() => {
    isAuthenticated()
  }, [])
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

export default App
