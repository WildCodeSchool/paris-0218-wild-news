import { createNewPost } from '/components/block-article-accueil.js'

fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'tips')
    const postElementTips = postsCategory1.map(createNewPost).join('')

    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const postElementJavascript = postsCategory2.map(createNewPost).join('')

    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
  })
