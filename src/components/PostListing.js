import React from 'react'
import { Link } from 'react-router-dom'

import Post from './Post'

export default ({ post }) => (
  <Post
    post={post}
  >
    <Link to={`/${post.category}/${post.id}`}>
      <h3 className="is-size-5">{post.title}</h3>
      <p>{post.body}</p>
    </Link>
  </Post>
)
