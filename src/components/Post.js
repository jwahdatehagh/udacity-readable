import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ContentVoter from './ContentVoter'
import Content from './Content'
import { destroyPost } from './../api'
import { Tag } from './../bulma'

class Post extends Component {

  constructor (props) {
    super(props)

    this.deletePost = this.deletePost.bind(this)
  }

  deletePost () {
    if (window.confirm('Are you sure you want to delete this post?')) {
      destroyPost(this.props.post)
    }
  }

  render () {
    const post = this.props.post

    return (
      <div className="post">
        <Content
          left={<ContentVoter content={post} type="post" />}
          tags={
            <span>
              <Link to={`/category/${post.category}`} >
                <Tag light># {post.category}</Tag>
              </Link>
              <Tag light>By: {post.author}</Tag>
              {this.props.tags}
            </span>
          }
          onDelete={this.deletePost}
        >
          {this.props.children}
        </Content>
      </div>
    )
  }

}

export default Post
