import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import ContentVoter from './ContentVoter'
import ContentTools from './ContentTools'
import Content from './Content'
import { destroyPost } from './../api'
import { Tag } from './../bulma'
import PostEditor from './PostEditor'

class Post extends Component {

  state = {
    editing: false
  }

  constructor (props) {
    super(props)

    this.toggleEdit = this.toggleEdit.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  toggleEdit () {
    this.setState({
      editing: !this.state.editing
    })
  }

  deletePost () {
    if (window.confirm('Are you sure you want to delete this post?')) {
      destroyPost(this.props.post)
      this.props.history.push('/')
    }
  }

  render () {
    const post = this.props.post

    return (
      this.state.editing
        ? <PostEditor post={post} afterSave={this.toggleEdit} />
        : <div className="post">
            <Content
              left={<ContentVoter content={post} type="post" />}
              right={ this.props.hideRight ? '' : <ContentTools onEdit={this.toggleEdit} onDelete={this.deletePost} />}
              tags={
                <span>
                  <Link to={`/category/${post.category}`} >
                    <Tag light># {post.category}</Tag>
                  </Link>
                  <Tag light>By: {post.author}</Tag>
                  {this.props.tags}
                </span>
              }
            >
              {this.props.children}
            </Content>
          </div>
    )
  }

}

export default withRouter(Post)
