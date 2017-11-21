import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import timeago from 'timeago.js'

import { Tag } from './../bulma'
import { fetchPost } from './../api'
import Post from './Post'
import Comment from './Comment'
import NewComment from './NewComment'

class PostDetail extends Component {

  componentDidMount () {
    fetchPost(this.props.match.params.postId)
  }

  render () {
    const post = this.props.posts[this.props.match.params.postId]
    const comments = this.props.comments
      .filter(comment => comment.parentId === post.id && comment.deleted !== true)
      .sort((c1, c2) => (c1.voteScore > c2.voteScore
        ? -1
        : c1.voteScore < c2.voteScore
          ? 1
          : 0
      ))

    if (!post) {
      return (
        <p className="has-text-centered">Loading...</p>
      )
    }

    return (
      <div className="content">
        <div className="post-detail">
          <Post post={post}>
            <h1 className="is-size-3">{post.title}</h1>
            <p>{post.body}</p>
            <div className="tags">
              <Link to={`/category/${post.category}`} >
                <Tag light># {post.category}</Tag>
              </Link>
              <Tag light>By: {post.author}</Tag>
              <Tag light>{timeago().format(post.timestamp)}</Tag>
            </div>
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

