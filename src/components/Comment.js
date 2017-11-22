import React, { Component } from 'react'
import timeago from 'timeago.js'

import {
  Control,
  Field,
  Tag,
  Button,
  Icon
} from './../bulma'
import { destroyComment } from './../api'
import Content from './Content'
import ContentVoter from './ContentVoter'
import CommentEditor from './CommentEditor'
import { capitalize } from './../helpers'

class Comment extends Component {

  state = {
    editing: false
  }

  constructor (props) {
    super(props)

    this.deleteComment = this.deleteComment.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit () {
    this.setState({
      editing: !this.state.editing
    })
  }

  deleteComment () {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      destroyComment(this.props.comment)
    }
  }

  render () {
    const comment = this.props.comment
    const { author, body, timestamp } = comment

    return (
      <div className="comment">
        {
          this.state.editing
          ? <CommentEditor comment={comment} afterSave={this.toggleEdit}/>
          : <Content
              left={<ContentVoter content={comment} type="comment" />}
              right={
                <Field className="has-addons">
                  <Control>
                    <Button onClick={this.toggleEdit} small>
                      <Icon small>
                        <i className="fa fa-pencil"></i>
                      </Icon>
                    </Button>
                  </Control>
                  <Control>
                    <Button onClick={this.deleteComment} small>
                      <Icon small>
                        <i className="fa fa-trash-o"></i>
                      </Icon>
                    </Button>
                  </Control>
                </Field>
              }
              tags={
                <span>
                  <Tag light>By: {capitalize(author)}</Tag>
                  <Tag light>{timeago().format(timestamp)}</Tag>
                </span>
              }
              onDelete={this.deleteComment}
            >
              <p className="is-size-6">{body}</p>
            </Content>
        }
      </div>
    )
  }

}

export default Comment
