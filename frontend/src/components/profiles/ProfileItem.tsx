import React, { FC } from 'react'
import { Profile } from '../../features/profileSlice'

type Props = {
  profile: Profile
}

const ProfileItem: FC<Props> = ({ profile }) => {
  return (
    <div className="profile bg-light">
      {/* @to-do */}
      {/* profileのuidからuser情報を取得する */}
    </div>
  )
}

export default ProfileItem
