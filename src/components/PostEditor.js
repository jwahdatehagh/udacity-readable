import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

import {
  Box,
  Field,
  Control,
  Textarea,
  Input,
  Button
} from './../bulma'
import { savePost } from './../api'
import { capitalize } from './../helpers'

class PostEditor extends Component {

  state = {
    id: '',
    postId: '',
    author: '',
    body: '',
    title: '',
    category: '',
    loading: false
  }

  constructor (props) {
    super(props)

    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    const { post } = this.props

    if (post) this.setState({
      id: post.id,
      author: post.author,
      body: post.body,
      title: post.title,
      category: post.category
    })
  }

  handleAuthorChange = (e) => this.setState({ author: e.target.value })
  handleBodyChange = (e) => this.setState({ body: e.target.value })
  handleTitleChange = (e) => this.setState({ title: e.target.value })
  handleCategoryChange = (e) => this.setState({ category: e.target.value })

  async submit (e) {
    e.preventDefault()

    const data = {
      id: this.state.id || uuidv4(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      timestamp: Date.now(),
      category: this.state.category || this.props.categories[0].path
    }

    try {
      this.setState({ loading: true })
      this.state.id
        ? await savePost(data, 'put')
        : await savePost(data, 'post')
      this.setState({ loading: false })
    } catch (e) {
      // Something went wrong
    }

    this.setState({ author: '', body: '', title: '' })
    this.props.afterSave && this.props.afterSave(data.id)
  }

  render () {
    return (
      <Box>
        <form onSubmit={this.submit}>
          <Field>
            <Control>
              <Input
                value={this.state.title}
                onChange={this.handleTitleChange}
                type="text"
                placeholder="Post title..."
                required
              />
            </Control>
          </Field>
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
              <div className="select is-small">
                <select value={this.state.category} onChange={this.handleCategoryChange} required>
                <option key={-1}>Choose a category</option>

                  {this.props.categories.map(c => (
                    <option key={c.path} value={c.path} >#{capitalize(c.name)}</option>
                  ))}
                </select>
              </div>
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
    )
  }

}

const mapStateToProps = ({ categories }) => ({
  categories: Object.keys(categories).map(c => categories[c])
})

export default connect(mapStateToProps)(PostEditor)
