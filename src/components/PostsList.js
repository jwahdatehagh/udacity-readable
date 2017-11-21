import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { fetchPosts } from './../api'
import { capitalize } from './../helpers'
import PostListing from './PostListing'
import {
  Level
} from './../bulma'

class PostsList extends Component {

  state = {
    categoryId: null
  }

  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
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
    return category.path
      ? posts.filter(p => p.category === category.path)
      : posts
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
            <div class="select is-small">
              <select>
                <option>Filter by popularity</option>
                <option>Filter by timestamp</option>
              </select>
            </div>
            <button className="button is-primary is-small">New Post</button>
          </Level.Right>
        </Level>

        <div className="posts">
          {posts.map(post => (
            <PostListing post={post} key={post.id} />
          ))}
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
