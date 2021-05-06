import React, { FC, useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectProfiles,
  selectProfileLoading,
  fetchAllProfile,
} from '../../features/profileSlice'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles: FC = () => {
  const dispatch = useAppDispatch()
  const profiles = useAppSelector(selectProfiles)
  const loading = useAppSelector(selectProfileLoading)
  useEffect(() => {
    dispatch(fetchAllProfile())
  }, [])

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">プロフィール</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> 登録者と繋がろう
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile.uid._id} profile={profile} />
              ))
            ) : (
              <h4>登録者はいません</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profiles
