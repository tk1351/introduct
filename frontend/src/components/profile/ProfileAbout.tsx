import React, { FC, Fragment } from 'react'
import { ProfileData } from '../../features/profileSlice'

type Props = {
  profile: ProfileData
}

const ProfileAbout: FC<Props> = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <Fragment>
          <h2 className="text-primary">{profile.uid.name}さんの自己紹介</h2>
          <p>{profile.bio}</p>
        </Fragment>
      )}
    </div>
  )
}

export default ProfileAbout
