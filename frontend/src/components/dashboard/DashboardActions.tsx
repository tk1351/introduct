import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const DashboardActions: FC = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i>{' '}
        プロフィールを編集する
      </Link>
    </div>
  )
}

export default DashboardActions
