import { ADD_POST, DELETE_POST, UPDATE_COMMENT_COUNT } from './../action-types'

const posts = (state = {}, action) => {
  let { post } = action

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

    case UPDATE_COMMENT_COUNT:
      const { postId, change } = action
      post = state[postId]
      post.commentCount = post.commentCount + change
      return {
        ...state,
        [post.id]: post
      }

    default:
      return state
  }
}

export default posts
