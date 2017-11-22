import React from 'react'
import { withRouter } from 'react-router-dom'

import PostEditor from './PostEditor'

export default withRouter(({ history }) => (
  <div className="content new-post">
    <h1 className="is-size-4">New Post</h1>

    <PostEditor afterSave={(postId) => history.push(`/post/${postId}`) }/>
  </div>
))
