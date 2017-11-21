import React, { Component } from 'react'

import ContentVoter from './ContentVoter'
import Content from './Content'
import { destroyPost } from './../api'

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
          onDelete={this.deletePost}
        >
          {this.props.children}
        </Content>
      </div>
    )
  }

}

export default Post
