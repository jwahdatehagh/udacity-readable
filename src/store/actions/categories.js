import { ADD_CATEGORY } from './../action-types'

export function addCategory (category) {
  return {
    type: ADD_CATEGORY,
    category
  }
}
