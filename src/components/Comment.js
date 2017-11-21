import React, { Component } from 'react'
import timeago from 'timeago.js'

import { Tag } from './../bulma'
import Content from './Content'
import ContentVoter from './ContentVoter'
import { destroyComment } from './../api'

class Comment extends Component {

  constructor (props) {
    super(props)

    this.deleteComment = this.deleteComment.bind(this)
  }

  deleteComment () {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      destroyComment(this.props.comment)
    }
  }

  render () {
    const comment = this.props.comment

    return (
      <div className="comment">
        <Content
          left={<ContentVoter content={comment} type="comment" />}
          onDelete={this.deleteComment}
        >
          <p className="is-size-6">{comment.body}</p>
          <div className="tags">
            <Tag light>By: {comment.author}</Tag>
            <Tag light>{timeago().format(comment.timestamp)}</Tag>
          </div>
        </Content>
      </div>
    )
  }

}

export default Comment
