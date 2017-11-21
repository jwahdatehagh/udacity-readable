import { ADD_POST } from './../action-types'

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}
