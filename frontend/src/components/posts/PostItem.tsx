import React, { FC } from 'react'
import { PostData } from '../../features/postSlice'
import { useAppSelector } from '../../app/hooks'
import { selectAuthState } from '../../features/authSlice'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

type Props = {
  post: PostData
}

const PostItem: FC<Props> = ({ post }) => {
  const auth = useAppSelector(selectAuthState)
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img src={post.avatar} className="round-img" />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <h4>{post.title}</h4>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
        </p>
        <button className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </span>
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          コメント{' '}
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {!auth.loading && post.uid === auth.user?._id && (
          <button className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default PostItem
