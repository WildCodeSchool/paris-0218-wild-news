import { createNewPost } from '/components/block-article-seul.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

console.log(id)
fetch(`http://localhost:3000/post/${id}`)
  .then(response => response.json())
  .then(post => {

  const postSeul = document.getElementById('postToutSeul')
  postSeul.innerHTML = createNewPost(post)

})
