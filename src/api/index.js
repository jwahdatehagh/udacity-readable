import { addCategory } from './../store/actions/categories'
import { addPost, deletePost, updateCommentCount } from './../store/actions/posts'
import { addComment, deleteComment } from './../store/actions/comments'
import store from './../store'

const request = (url, options) => {
  const headers = new Headers()
  headers.append('Authorization', 'crezy-key')
  headers.append('Content-Type', 'application/json')

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

export async function fetchPost (postId) {
  const promises = [
    request(`posts/${postId}`),
    request(`posts/${postId}/comments`)
  ]

  const [ postResponse, commentsResponse ] = await Promise.all(promises)

  const post = await postResponse.json()
  if (!(post && post.id)) return

  store.dispatch(addPost(post))

  const comments = await commentsResponse.json()
  comments.forEach(comment => store.dispatch(addComment(comment)))
}

export async function voteForPost (post, option) {
  const response = await request(`posts/${post.id}`, {
    method: 'post',
    body: JSON.stringify({ option })
  })
  const updatedPost = await response.json()
  store.dispatch(addPost(updatedPost))
}

export async function savePost (data, method = 'post') {
  const url = method === 'post'
    ? 'posts'
    : `posts/${data.id}`
  const response = await request(url, {
    method,
    body: JSON.stringify(data)
  })
  const post = await response.json()
  store.dispatch(addPost(post))
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

export async function saveComment (data, method = 'post') {
  const url = method === 'post'
    ? 'comments'
    : `comments/${data.id}`

  const response = await request(url, {
    method,
    body: JSON.stringify(data)
  })
  const comment = await response.json()
  store.dispatch(addComment(comment))
  store.dispatch(updateCommentCount(comment.parentId, 1))
}

export async function voteForComment (comment, option) {
  const response = await request(`comments/${comment.id}`, {
    method: 'post',
    body: JSON.stringify({ option })
  })
  const newComment = await response.json()
  store.dispatch(addComment(newComment))
}

export async function destroyComment (comment) {
  store.dispatch(deleteComment(comment))

  try {
    const response = await request(`comments/${comment.id}/`, { method: 'delete' })
    comment = await response.json()
    store.dispatch(addComment(comment))
  } catch (e) {
    store.dispatch(addComment(comment))
  }

  store.dispatch(updateCommentCount(comment.parentId, -1))
}

export default request
