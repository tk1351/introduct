import React, { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAlert, AlertState } from '../../features/alertSlice'

const Alert: FC = () => {
  const alerts = useAppSelector(selectAlert)
  const isAlert = alerts.map((alert: AlertState) =>
    alert.alertType === 'danger' ? (
      <div
        key={alert.id}
        className={`alert alert-${alert.alertType}`}
        aria-label="alert"
      >
        {alert.msg}
      </div>
    ) : null
  )
  return <div>{isAlert}</div>
}

export default Alert
