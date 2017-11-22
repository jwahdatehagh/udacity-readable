import React from 'react'

import {
  Field,
  Control,
  Button,
  Icon
} from './../bulma'

export default ({ onEdit, onDelete }) => (
  <Field className="has-addons">
    <Control>
      <Button onClick={onEdit} small>
        <Icon small>
          <i className="fa fa-pencil"></i>
        </Icon>
      </Button>
    </Control>
    <Control>
      <Button onClick={onDelete} small>
        <Icon small>
          <i className="fa fa-trash-o"></i>
        </Icon>
      </Button>
    </Control>
  </Field>
)
