import React from 'react'
import { Link } from 'react-router-dom'

import { Tag } from './../bulma'
import Post from './Post'

export default ({ post }) => (
  <Post post={post}>
    <Link to={`/post/${post.id}`}>
      <h3 className="is-size-5">{post.title}</h3>
      <p>{post.body}</p>
    </Link>
    <div className="tags">
      <Link to={`/category/${post.category}`} >
        <Tag light># {post.category}</Tag>
      </Link>
      <Tag light>{post.commentCount} { post.commentCount !== 1 ? 'comments' : 'comment' }</Tag>
    </div>
  </Post>
)
