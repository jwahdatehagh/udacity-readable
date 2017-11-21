import { addCategory } from './../store/actions/categories'
import { addPost } from './../store/actions/posts'
import store from './../store'

const get = (url) => {
  const headers = new Headers()
  headers.append('Authorization', 'crezy-key')

  return fetch(`http://localhost:3001/${url}`, { headers })
}

export async function fetchCategories () {
  const response = await get('categories')
  const { categories } = await response.json()

  categories.forEach(category => {
    store.dispatch(addCategory(category))
  })

  return categories
}

export async function fetchPosts (category) {
  const response = await get(category ? `${category}/posts` : 'posts')
  const posts = await response.json()

  posts.forEach(post => {
    store.dispatch(addPost(post))
  })
}

export default get
