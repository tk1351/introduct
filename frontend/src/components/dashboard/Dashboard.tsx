import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'

const Dashboard: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    //TODO: fetchCurrentProfile()の実装
  }, [])
  return <div>Dashboard</div>
}

export default Dashboard
