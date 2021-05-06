import React, { FC, useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import { RootState } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchProfileByUid,
  selectProfile,
  selectProfileLoading,
} from '../../features/profileSlice'
import { RouteComponentProps, Link } from 'react-router-dom'

type PageProps = {} & RouteComponentProps<{ id: string }>

const Profile: FC<PageProps> = ({ match }) => {
  const { id } = match.params
  console.log(match)
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectProfileLoading)
  const auth = useAppSelector((state: RootState) => state.auth.auth)

  useEffect(() => {
    dispatch(fetchProfileByUid(id))
  }, [])
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            戻る
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user?._id === profile.uid._id && (
              <Link to="/edit-profile" className="btn btn-datk">
                プロフィールを編集する
              </Link>
            )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
