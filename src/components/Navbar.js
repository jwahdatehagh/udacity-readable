import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import { capitalize } from './../helpers'
import Logo from './Logo'

class Navbar extends Component {

  render () {
    return (
      <nav>

        <Logo />

        <div className="tabs is-centered is-md-right">
          <ul>
            <li>
              <NavLink
                to="/"
                exact
                activeClassName="is-active"
              >All</NavLink>
            </li>

            {this.props.categories.map(category => (
              <NavLink
                to={{
                  pathname: `/category/${category.path}`
                }}
                activeClassName="is-active"
                key={category.path}
              >
                {capitalize(category.name)}
              </NavLink>
            ))}
          </ul>
        </div>

      </nav>
    )
  }

}

const mapStateToProps = ({ categories }) => {
  return {
    categories: Object.keys(categories).map(c => categories[c])
  }
}

// FixMe - See https://github.com/ReactTraining/react-router/issues/3286
export default withRouter(connect(mapStateToProps)(Navbar))
