import React, { FC } from 'react'
import { Profile } from '../../features/profileSlice'
import { Link } from 'react-router-dom'

type Props = {
  profile: Profile
}

const ProfileItem: FC<Props> = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img src={profile.uid.avatar} className="round-img" />
      <div>
        <h2>{profile.uid.name}</h2>
        <p>{profile.company && <span>企業： {profile.company}</span>}</p>
        <p className="my-1">
          {profile.location && <span>住所： {profile.location}</span>}
        </p>
        <Link to={`/profile/${profile.uid._id}`} className="btn btn-primary">
          プロフィールを確認する
        </Link>
      </div>
    </div>
  )
}

export default ProfileItem
