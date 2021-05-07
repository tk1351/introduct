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
import PrivateRoute from './routing/PrivateRoute'
import Dashboard from './dashboard/Dashboard'
import CreateProfile from './profile-form/CreateProfile'
import EditProfile from './profile-form/EditProfile'
import Profiles from './profiles/Profiles'
import Profile from './profile/Profile'
import Posts from './posts/Posts'

import '../App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isAuthenticated = async () => {
      const resultAction = await dispatch(loadUser())
      if (loadUser.fulfilled.match(resultAction)) {
        unwrapResult(resultAction)
      }
    }
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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/posts" component={Posts} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

export default App
