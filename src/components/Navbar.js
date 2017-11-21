import React, { Component } from 'react'
import Logo from './Logo'

class Navbar extends Component {

  render () {
    return (
      <nav>

        <Logo />

        <div className="tabs is-centered is-md-right">
          <ul>
            <li className="is-active"><a>Category 1</a></li>
            <li><a>Category 2</a></li>
            <li><a>Category 3</a></li>
            <li><a>Category 4</a></li>
          </ul>
        </div>

      </nav>
    )
  }

}

export default Navbar
