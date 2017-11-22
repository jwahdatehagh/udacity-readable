import React from 'react'
import { Link } from 'react-router-dom'

import Post from './Post'
import { Tag } from './../bulma'

export default ({ post }) => (
  <Post
    post={post}
    hideRight={true}
    tags={
      <Tag light>{post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}</Tag>
    }
  >
    <Link to={`/post/${post.id}`}>
      <h3 className="is-size-5">{post.title}</h3>
      <p>{post.body}</p>
    </Link>
  </Post>
)
