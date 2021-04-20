import React, { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAlert } from '../../features/alertSlice'

const Alert: FC = () => {
  const alert = useAppSelector(selectAlert).slice(-1)[0]
  const isAlert =
    alert.alertType === 'danger' ? (
      <>
        <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
      </>
    ) : null
  return <div>{isAlert}</div>
}

export default Alert
