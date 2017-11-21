import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom'

import { capitalize } from './../helpers'
import Logo from './Logo'

class Navbar extends Component {

  render () {
    return (
      <nav>

        <Link to="/">
          <Logo />
        </Link>

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

const mapStateToProps = ({ categories }) => ({
  categories: Object.keys(categories).map(c => categories[c])
})

export default withRouter(connect(mapStateToProps)(Navbar))
