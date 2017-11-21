import { ADD_POST } from './../action-types'

const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      const { post } = action

      return {
        ...state,
        [post.id]: post
      }
    default:
      return state
  }
}

export default posts
