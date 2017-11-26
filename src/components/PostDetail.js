import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import timeago from 'timeago.js'

import { Tag } from './../bulma'
import { fetchPost } from './../api'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'
import NoMatch from './NoMatch'

class PostDetail extends Component {

  state = {
    loading: false
  }

  async componentDidMount () {
    this.setState({ loading: true })
    await fetchPost(this.props.match.params.postId)
    this.setState({ loading: false })
  }

  render () {
    const post = this.props.posts[this.props.match.params.postId]

    if (this.state.loading) return <p className="has-text-centered">Loading...</p>

    if (!post) return <NoMatch />

    const comments = this.props.comments
      .filter(comment => comment.parentId === post.id && comment.deleted !== true)
      .sort((c1, c2) => (c1.voteScore > c2.voteScore
        ? -1
        : c1.voteScore < c2.voteScore
          ? 1
          : 0
      ))

    return (
      <div className="content">
        <div className="post-detail">
          <Post
            post={post}
            tags={ <Tag light>{timeago().format(post.timestamp)}</Tag> }
          >
            <h1 className="is-size-3">{post.title}</h1>
            <p>{post.body}</p>
          </Post>
        </div>

        <div className="comments">
          { comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}

          <NewComment postId={post.id} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments: Object.keys(comments).map(c => comments[c])
})

export default withRouter(connect(mapStateToProps)(PostDetail))

