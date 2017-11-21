import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Media,
  Field,
  Control,
  Textarea,
  Level,
  Button,
  Checkbox,
  Delete,
  Tag
} from './../bulma'

export default ({ post }) => {
  const { title, body, category, commentCount } = post

  return (
    <Box className="post-listing">
    <Media>
      <Media.Content>
        <Link to={''}>
          <h3 className="is-size-5">{title}</h3>
          <p>{body}</p>
        </Link>
        <div className="tags">
          <Link to={`/category/${category}`} >
            <Tag light># {category}</Tag>
          </Link>
          <Tag light>{commentCount} { commentCount !== 1 ? 'comments' : 'comment' }</Tag>
        </div>
      </Media.Content>
      <Media.Right>
        <Delete />
      </Media.Right>
    </Media>
    </Box>
  )
}
