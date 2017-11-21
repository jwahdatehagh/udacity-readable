import React, { Component } from 'react'
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
import { destroyPost, voteForPost } from './../api'

class PostListing extends Component {

  state = {
    post: null
  }

  constructor (props) {
    super(props)

    this.deletePost = this.deletePost.bind(this)
    this.upvotePost = this.upvotePost.bind(this)
    this.downvotePost = this.downvotePost.bind(this)
  }

  componentDidMount () {
    this.setState({ post: this.props.post })
  }

  deletePost () {
    if (window.confirm('Are you sure you want to delete this post?')) {
      destroyPost(this.state.post)
    }
  }

  upvotePost = () => voteForPost(this.state.post, 'upVote')
  downvotePost = () => voteForPost(this.state.post, 'downVote')

  render () {
    const post = this.props.post
    const { title, body, category, commentCount, voteScore } = post

    return (
      <Box className="post-listing">
        <Media>
          <Media.Left>
            <p className="votes">
              <button className="button is-small" onClick={this.upvotePost}>+</button>
              <span>{voteScore}</span>
              <button className="button is-small" onClick={this.downvotePost}>-</button>
            </p>
          </Media.Left>
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
            <Delete onClick={this.deletePost}/>
          </Media.Right>
        </Media>
      </Box>
    )
  }

}

export default PostListing
