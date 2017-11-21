import { addCategory } from './../store/actions/categories'
import { addPost, deletePost } from './../store/actions/posts'
import store from './../store'

const request = (url, options) => {
  const headers = new Headers()
  headers.append('Authorization', 'crezy-key')

  return fetch(`http://localhost:3001/${url}`, { ...options, headers })
}

export async function fetchCategories () {
  const response = await request('categories')
  const { categories } = await response.json()

  categories.forEach(category => {
    store.dispatch(addCategory(category))
  })

  return categories
}

export async function fetchPosts (category) {
  const response = await request(category ? `${category}/posts` : 'posts')
  const posts = await response.json()

  posts.forEach(post => {
    store.dispatch(addPost(post))
  })
}

export async function destroyPost (post) {
  store.dispatch(deletePost(post))

  try {
    const response = await request(`posts/${post.id}`, { method: 'delete' })
    post = await response.json()
    store.dispatch(addPost(post))
  } catch (e) {
    store.dispatch(addPost(post))
  }
}

export default request
