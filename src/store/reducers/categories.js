import { ADD_CATEGORY } from './../action-types'

const categories = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const { category } = action

      return {
        ...state,
        [category.path]: category
      }
    default:
      return state
  }
}

export default categories
