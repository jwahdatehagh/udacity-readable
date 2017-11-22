import React from 'react'

import {
  Box,
  Media
} from './../bulma'

export default (props) => (
  <Box>
    <Media>
      <Media.Left>
        {props.left}
      </Media.Left>
      <Media.Content>
        <div className="text">
          {props.children}
        </div>

        <div className="tags">
          {props.tags}
        </div>
      </Media.Content>
      <Media.Right>
        {props.right}
      </Media.Right>
    </Media>
  </Box>
)
