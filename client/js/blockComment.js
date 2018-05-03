/* global URLSearchParams */
// =========IMPORT COMPONENTS==============//
import { createNewComment } from '/components/block-comment.js'
import { config } from '/parameters.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')
// =========FETCH COMMENT============//
window.fetch(`${config.serverHost}/comment/${id}`)
  .then(response => response.json())
  .then(comment => {
    const postComment = document.getElementById('comment-content')
    const readComment = comment.map(createNewComment).join('')
    postComment.innerHTML = readComment
    console.log(readComment)
  })

  // =========ADD COMMENT============//
document.getElementById('add-comment').addEventListener('submit', event => { // get button and event
  event.preventDefault() // prevent reload of the page after submit
  // get values of the form
  const author = document.getElementById('author-comment').value
  const content = document.getElementById('content-comment').value
  // Fetch which post data of the new category
  window.fetch(`${config.serverHost}/comment`, {
    method: 'post',
    body: JSON.stringify({
      author,
      content
    })
  }).then(res => console.log(res.status))
})
