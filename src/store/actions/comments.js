import { ADD_COMMENT, DELETE_COMMENT } from './../action-types'

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}
