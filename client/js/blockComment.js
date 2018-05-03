/* global URLSearchParams */
// =========IMPORT COMPONENTS==============//
import { config } from '/parameters.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

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
      content,
      post: id
    })
  }).then(res => console.log(res.status))
})
