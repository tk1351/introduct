import React, { FC, useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPostLoading, fetchAllPosts } from '../../features/postSlice'
import Spinner from '../layout/Spinner'

const Posts: FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectPostLoading)

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [])
  return (
    <Fragment>{loading ? <Spinner /> : <Fragment>Posts</Fragment>}</Fragment>
  )
}

export default Posts
