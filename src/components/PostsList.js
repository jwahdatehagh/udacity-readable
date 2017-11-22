import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { fetchPosts } from './../api'
import { capitalize } from './../helpers'
import PostListing from './PostListing'
import { Level } from './../bulma'

class PostsList extends Component {

  state = {
    categoryId: null,
    sortBy: 'voteScore'
  }

  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.changeSorting = this.changeSorting.bind(this)
  }

  componentDidMount () {
    const categoryId = this.props.match.params.categoryId
    this.updateCategory(categoryId)
    fetchPosts(categoryId)
  }

  componentDidUpdate () {
    const newCategory = this.props.match.params.categoryId

    if (this.state.categoryId !== newCategory) {
      this.updateCategory(newCategory)
      fetchPosts(newCategory)
    }
  }

  updateCategory (categoryId) {
    this.setState({ categoryId })
  }

  filterPosts (posts, category) {
    const sortBy = this.state.sortBy

    posts = posts
      .filter(p => p.deleted !== true)
      .sort((p1, p2) => {
        if (p1[sortBy] > p2[sortBy]) return 1
        else if (p1[sortBy] < p2[sortBy]) return -1
        else return 0
      })
      .reverse()

    return category.path
      ? posts.filter(p => p.category === category.path)
      : posts
  }

  changeSorting (e) {
    this.setState({sortBy: e.target.value});
  }

  render() {
    const category = this.props.categories[this.props.match.params.categoryId] || {}
    const posts = this.filterPosts(this.props.posts, category)

    return (
      <div className="posts-list content">
        <Level>
          <Level.Left>
            <h2>{capitalize(category.name || 'all')} Posts</h2>
          </Level.Left>
          <Level.Right>
            <div className="select is-small">
              <select value={this.state.sortBy} onChange={this.changeSorting}>
                <option value="voteScore">Most popular first</option>
                <option value="timestamp">Newest first</option>
              </select>
            </div>
            <Link to="/new">
              <button className="button is-primary is-small">New Post</button>
            </Link>
          </Level.Right>
        </Level>

        <div className="posts">
          {posts.length
            ? posts.map(post => (
              <PostListing post={post} key={post.id} />
            ))
            : (
              <p className="has-tex-centered">No posts yet. Create one!</p>
            )
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ posts, categories }) => ({
  categories,
  posts: Object.keys(posts).map(p => posts[p])
})

export default withRouter(connect(mapStateToProps)(PostsList))
