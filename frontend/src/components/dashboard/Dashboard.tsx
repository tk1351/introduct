import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { fetchCurrentProfile } from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Dashboard: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    //TODO: fetchCurrentProfile()の実装
    const profileMe = async () => {
      const resultAction = await dispatch(fetchCurrentProfile())
      if (fetchCurrentProfile.fulfilled.match(resultAction)) {
        unwrapResult(resultAction)
      }
    }
    profileMe()
  }, [])
  return <div>Dashboard</div>
}

export default Dashboard
