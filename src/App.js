import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import PostsList from './components/PostsList'
import PostDetail from './components/PostDetail'
import { fetchCategories } from './api'

class App extends Component {

  componentDidMount () {
    fetchCategories()
  }

  render() {
    return (
      <div className="App container">
        <Navbar />

        <Route path="/" exact component={PostsList} />
        <Route path="/category/:categoryId" component={PostsList} />
        <Route path="/post/:postId" component={PostDetail} />
      </div>
    );
  }
}

export default App
