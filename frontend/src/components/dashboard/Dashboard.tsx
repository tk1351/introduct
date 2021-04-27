import React, { FC, useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchCurrentProfile,
  selectProfile,
  selectProfileLoading,
} from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectAuthUser } from '../../features/authSlice'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Dashboard: FC = () => {
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

  return (
    <>
      {profile && loading === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead" arial-label="lead">
            <i className="fas fa-user">
              ようこそ {authUser && authUser.name} さん
            </i>
          </p>
          {profile !== null ? (
            <Fragment>has</Fragment>
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
