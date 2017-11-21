import { ADD_POST, DELETE_POST } from './../action-types'

const posts = (state = {}, action) => {
  const { post } = action

  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      }

    case DELETE_POST:
      post.deleted = true
      return {
        ...state,
        [post.id]: post
      }

    default:
      return state
  }
}

export default posts
