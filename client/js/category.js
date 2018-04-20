import { createNewPost } from '/components/block-category.js'
import { createNewTitle } from '/components/block-title-category.js'
import { createNavBar } from '/components/nav-bar.js'

const params = new URLSearchParams(window.location.search)
const name = params.get('name')


fetch(`http://localhost:3000/category/${name}`)
  .then(response => response.json())
  .then(posts => {
        console.log(posts)



    const postsElementTips = document.getElementById('posts-tips')
    const titleCategory = document.getElementById('category-title')

    const postsCategory1 = posts.filter(post => post.category === `${name}`)
    const postElementTips = postsCategory1.map(createNewPost).join('')

    titleCategory.innerHTML = createNewTitle(`${name}`)
    postsElementTips.innerHTML = postElementTips

  })

//******************AJOUT NAVBAR DYNAMIC**************//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => {

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('')

    categoriesList.innerHTML = categoryList
  })

//******************AJOUT CATEGORIE**************//

document.getElementById('add-category').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('titre-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value


  fetch('http://localhost:3000/category', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image
    })
  }).then(res => console.log(res.status))
})

//******************OUVERTURE DU FORMULAIRE CREER LIEN**************//
// Get the modal
const modal = document.getElementById('myModalLink');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//******************POST LINK**************//


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
      categorie: `${name}`,
      auteur
    })
  }).then(res => console.log(res.status))
})

//******************OUVERTURE DU FORMULAIRE CREATION CATEGORIE**************//
// Get the modal
const modalCat = document.getElementById('myModalCat');

// Get the button that opens the modal
const btnCat = document.getElementById("btn-category");

// Get the <span> element that closes the modal
const spanCat = document.getElementsByClassName("closeCat")[0];

// When the user clicks the button, open the modal
btnCat.onclick = function() {
    modalCat.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanCat.onclick = function() {
    modalCat.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(eventCat) {
    if (eventCat.target == modalCat) {
        modalCat.style.display = "none";
    }
}
