import { createNewPost } from '/components/block-category.js'

fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'Tips')
    const postElementTips = postsCategory1.map(createNewPost).join('')

    postsElementTips.innerHTML = postElementTips
  })
