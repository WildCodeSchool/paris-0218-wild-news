import { createCategoryElement } from './components/home.js' // ce module permet de créer les containers de category dans la page home
import { createPostElement } from './components/home.js' // ce module permet de créer les posts qui sont dans les containers category de la page home
import { createHeader } from './components/header.js'
import { createFooter } from './components/Footer.js'

fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(allUsers => {
    const postHeader = document.querySelectorAll('.headbar')
    postHeader.innerHTML = createHeader(allUsers[0])
    console.log(allUsers[0])
  })

fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(posts => {
    console.log(posts)
    Object.keys(posts).forEach(function (category) {
      const categoriesContainer = document.querySelector('.categories')
      categoriesContainer.innerHTML += createCategoryElement(category)
      const postsContainer = document.querySelector('.cat-' + category.toLowerCase())
      postsContainer.innerHTML = posts[category].map(createPostElement).join('')
    })
  })

const footerContainer = document.querySelector('footer')
footerContainer.innerHTML = createFooter()

const createArticleElement = article => {
  return `<div class="slider column column-100">
            <h2> ${article.title} </h2>
            <img src="${article.image}" alt="slide 1">
            <p> by : ${article.author} the : ${article.date}  </p>
            <p> description: ${article.text} </p>
            <a href="${article.source}">click for more</a>
        </div>`
}

const params = new URLSearchParams(window.location.search)
fetch('http://localhost:3000/article/' + params.get('id'))
  .then(response => response.json())
  .then(article => {
    console.log(article)
    const articleContainer = document.querySelector('.articles')
    articleContainer.innerHTML = createArticleElement(article)
  })
