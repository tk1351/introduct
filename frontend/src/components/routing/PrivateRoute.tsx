import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { Redirect, Route } from 'react-router-dom'
import { selectIsAuthenticated, selectLoading } from '../../features/authSlice'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loading = useAppSelector(selectLoading)
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
