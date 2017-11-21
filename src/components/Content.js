import React from 'react'

import {
  Box,
  Media,
  Delete,
} from './../bulma'

export default (props) => (
  <Box>
    <Media>
      <Media.Left>
        {props.left}
      </Media.Left>
      <Media.Content>
        {props.children}
      </Media.Content>
      <Media.Right>
        <Delete onClick={props.onDelete}/>
      </Media.Right>
    </Media>
  </Box>
)
