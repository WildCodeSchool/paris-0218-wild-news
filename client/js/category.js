import { createNewPost } from '/components/block-category.js'

const params = new URLSearchParams(window.location.search)
const name = params.get('name')
fetch(`http://localhost:3000/category/${name}`)
  .then(response => response.json())
  .then(posts => {
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === `${name}`)
    const postElementTips = postsCategory1.map(createNewPost).join('')
    postsElementTips.innerHTML = postElementTips
  })
