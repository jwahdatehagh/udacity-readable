import React from 'react'
import { voteForPost, voteForComment } from './../api'

export default ({ content, type }) => {
  const upVote = () => {
    type === 'post'
      ? voteForPost(content, 'upVote')
      : voteForComment(content, 'upVote')
  }
  const downVote = () => {
    type === 'post'
      ? voteForPost(content, 'downVote')
      : voteForComment(content, 'downVote')
  }

  return (
    <p className="votes">
      <button className="button is-small" onClick={upVote}>+</button>
      <span>{content.voteScore}</span>
      <button className="button is-small" onClick={downVote}>-</button>
    </p>
  )
}
