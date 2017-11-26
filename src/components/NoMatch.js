import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="has-text-centered content">
    <h1 className="is-size-5">We couldn't find this page.</h1>
    <Link to="/" className="button is-primary">Go to the home page</Link>
  </div>
)