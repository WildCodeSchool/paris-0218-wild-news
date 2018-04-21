//=========IMPORT LES COMPONENTS==============//
import { createNewPost } from '/components/block-category.js'
import { createNewTitle } from '/components/block-title-category.js'
import { createNavBar } from '/components/nav-bar.js'

const params = new URLSearchParams(window.location.search) // Récupère les paramètres de l'url : nom, id, et plein d'autres choses (faire console.log pour tt voir)
const name = params.get('name') //Récupère la partie name des paramètres de l'url (donc pour nous le nom de la catégorie)

//=========FETCH DE LA CATEGORY AVEC NOM==============//
fetch(`http://localhost:3000/category/${name}`)
  .then(response => response.json())
  .then(posts => { //récupère tous les posts du mock sans distinction

    const postsElementTips = document.getElementById('posts-tips')
    const titleCategory = document.getElementById('category-title')

    const postsCategory1 = posts.filter(post => post.category === `${name}`) //filtre les posts en fonction du nom de la catégorie (récupérer dans l'url)
    const postElementTips = postsCategory1.map(createNewPost).join('') //pour chaque post applique la fonction createNewPost provenant du component

    titleCategory.innerHTML = createNewTitle(`${name}`) //insert le titre de la catégorie dans HTML
    postsElementTips.innerHTML = postElementTips //insert les posts dans le HTML

  })

//=========AJOUT NAVBAR DYNAMIC==============//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => { //récupère tableau de titre de catégorie (trié au niveau serveur fichier index.js)

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('') //applique fonction createNavBar provenant du component sur chaque catégorie

    categoriesList.innerHTML = categoryList //insert dans HTML
  })

//=========AJOUT DE CATEGORIE VIA BOUTON ADD==============//
document.getElementById('add-category').addEventListener('submit', event => { //récupère bouton et évènement
  event.preventDefault() //évite de recharger la page à chaque submit (comportement par défaut)

  //récupère valeur formulaire des catégorie : titre, description,...
  const title = document.getElementById('titre-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value

  //Fetch qui post les valeurs de la nouvelle catégorie
  fetch('http://localhost:3000/category', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image
    })
  }).then(res => console.log(res.status))
})

//=========OUVERTURE FORMULAIRE POST LINK==============//
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

//=========AJOUT LIEN============//

//Récupère les valeurs des élèments et l'évènement
document.getElementById('add-link').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('titre-article').value
  const description = document.getElementById('description-article').value
  const image = document.getElementById('img-article').value
  const lien = document.getElementById('lien-article').value
  const categorie = document.getElementById('categorie-article').value
  const auteur = document.getElementById('auteur-article').value

//Fetch qui post les valeurs pour les ajouter dans le mock
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

//=========OUVERTURE FORMULAIRE ADD CATEGORY============//
//=========ID Différents de formulaire pour poster liens============//

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
