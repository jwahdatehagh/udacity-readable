import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import PostsList from './components/PostsList'
import PostDetail from './components/PostDetail'
import NewPost from './components/NewPost'
import NoMatch from './components/NoMatch'
import { fetchCategories } from './api'

class App extends Component {

  componentDidMount () {
    fetchCategories()
  }

  render() {
    return (
      <div className="App container">
        <Navbar />

        <Switch>
          <Route path="/" exact component={PostsList} />
          <Route path="/category/:categoryId" component={PostsList} />
          <Route path="/:categoryId/:postId" component={PostDetail} />
          <Route path="/new" component={NewPost} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App
