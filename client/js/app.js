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

document.getElementById('add-link').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('titre-article').value
  const description = document.getElementById('description-article').value
  const image = document.getElementById('img-article').value
  const lien = document.getElementById('lien-article').value
  const categorie = document.getElementById('categorie-article').value
  const auteur = document.getElementById('auteur-article').value

  fetch('http://localhost:3000/post', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image,
      lien,
      categorie,
      auteur
    })
  }).then(res => console.log(res.status))
})
