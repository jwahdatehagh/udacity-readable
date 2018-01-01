import { ADD_POST, DELETE_POST, UPDATE_COMMENT_COUNT } from './../action-types'

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost (post) {
  return {
    type: DELETE_POST,
    post
  }
}

export function updateCommentCount (postId, change) {
  return {
    type: UPDATE_COMMENT_COUNT,
    postId,
    change
  }
}
