import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import {
  Box,
  Field,
  Control,
  Textarea,
  Input,
  Button
} from './../bulma'
import { saveComment } from './../api'

class CommentEditor extends Component {

  state = {
    id: '',
    postId: '',
    author: '',
    body: '',
    loading: false
  }

  constructor (props) {
    super(props)

    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    const { comment } = this.props

    if (comment) this.setState({
      id: comment.id,
      postId: comment.parentId,
      author: comment.author,
      body: comment.body
    })
  }

  handleAuthorChange = (e) => this.setState({ author: e.target.value })
  handleBodyChange = (e) => this.setState({ body: e.target.value })

  async submit (e) {
    e.preventDefault()

    const data = {
      id: this.state.id || uuidv4(),
      body: this.state.body,
      author: this.state.author,
      timestamp: Date.now(),
      parentId: this.state.postId || this.props.postId
    }

    try {
      this.setState({ loading: true })
      this.state.id
        ? await saveComment(data, 'put')
        : await saveComment(data, 'post')
      this.setState({ loading: false })
    } catch (e) {
      // Something went wrong
    }

    this.setState({ author: '', body: '' })
    this.props.afterSave && this.props.afterSave()
  }

  render () {
    return (
      <div className="new-comment">
        <Box>
          <form onSubmit={this.submit}>
            <Field>
              <Control>
                <Textarea
                  value={this.state.body}
                  onChange={this.handleBodyChange}
                  placeholder="Add a comment..."
                  required
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Input
                  value={this.state.author}
                  onChange={this.handleAuthorChange}
                  type="text"
                  placeholder="Author name..."
                  small
                  required
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Button type="submit" primary small loading={this.state.loading}>
                  Save Comment
                </Button>
              </Control>
            </Field>
          </form>
        </Box>
      </div>
    )
  }

}

export default CommentEditor
