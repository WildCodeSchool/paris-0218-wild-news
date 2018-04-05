import {createCategoryElement} from './components/home.js' // ce module permet de créer les containers de category dans la page home
import {createPostElement} from './components/home.js' // ce module permet de créer les posts qui sont dans les containers category de la page home

fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(posts => {
    console.log(posts) // ce console.log sert juste a verifier dans la console si tout fonctionne, il n'est donc pas obligatoire
    Object.keys(posts).forEach(function (category) { // object.keys est utilisé ici car le forEach ne fonctionne QUE sur des arrays, hors on a un objet donc en passant par les clés on peut réaliser un forEach. Voir plus sur MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
      const categoriesContainer = document.querySelector('.categories') // ce premier constituera les containers des catégories
      categoriesContainer.innerHTML += createCategoryElement(category)
      const postsContainer = document.querySelector('.cat-' + category.toLowerCase()) // celui la complètera avec les articles correspondant
      postsContainer.innerHTML = posts[category].map(createPostElement).join('')
    })
  })
