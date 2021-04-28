import React, { useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchCurrentProfile,
  selectProfile,
  selectProfileLoading,
  deleteProfile,
} from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectAuthUser, logout } from '../../features/authSlice'
import Spinner from '../layout/Spinner'
import { Link, RouteComponentProps } from 'react-router-dom'
import Alert from '../layout/Alert'
import DashboardActions from './DashboardActions'
import { v4 as uuidv4 } from 'uuid'
import { setAlert, removeAlert } from '../../features/alertSlice'

interface Props extends RouteComponentProps {}

const Dashboard = ({ history }: Props) => {
  const dispatch = useAppDispatch()

  const authUser = useAppSelector(selectAuthUser)
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectProfileLoading)

  useEffect(() => {
    const profileMe = async () => {
      const resultAction = await dispatch(fetchCurrentProfile())
      if (fetchCurrentProfile.fulfilled.match(resultAction)) {
        unwrapResult(resultAction)
      }
    }
    profileMe()
  }, [])

  const deleteAccount = async () => {
    if (window.confirm('アカウントを削除してもよろしいですか？')) {
      const resultAction = await dispatch(deleteProfile())
      if (deleteProfile.fulfilled.match(resultAction)) {
        await dispatch(logout())
        history.push('/')
        const id = uuidv4()
        const payload = resultAction.payload
        dispatch(
          setAlert({
            id,
            msg: payload.msg,
            alertType: 'success',
          })
        )
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      }
    }
  }

  return (
    <>
      {profile && loading === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead" arial-label="lead">
            <i className="fas fa-user">
              {' '}
              ようこそ {authUser && authUser.name} さん
            </i>
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAccount()}
                >
                  <i className="fas fa-user-minus"></i> アカウントの削除
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p aria-label="text">
                プロフィールが設定されていません。設定してください。
              </p>
              <Link
                to="/create-profile"
                className="btn btn-primary my-1"
                aria-label="link"
              >
                プロフィールを設定する
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  )
}

export default Dashboard
