import React, { FC, useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectPostLoading,
  fetchAllPosts,
  selectAllPosts,
} from '../../features/postSlice'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'

const Posts: FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectPostLoading)
  const posts = useAppSelector(selectAllPosts)

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> ようこそ
          </p>
          {/* PostForm */}
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Posts
