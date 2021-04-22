import React, { FC, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Register from './auth/Register'
import Login from './auth/Login'

import '../App.css'
import TestForm from './TestForm'

const App: FC = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/testform" component={TestForm} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

export default App
