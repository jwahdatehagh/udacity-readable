import React, { Component } from 'react'
import { Button } from './bulma'

import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar />
      </div>
    );
  }
}

export default App
