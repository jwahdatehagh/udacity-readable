import { ADD_COMMENT, DELETE_COMMENT } from './../action-types'

const comments = (state = {}, action) => {
  const { comment } = action

  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case DELETE_COMMENT:
      comment.deleted = true
      return {
        ...state,
        [comment.id]: comment
      }

    default:
      return state
  }
}

export default comments
