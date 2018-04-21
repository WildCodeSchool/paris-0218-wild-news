//=========IMPORT LES COMPONENTS==============//
import { createNewPost } from '/components/block-article-seul.js'
import { createNavBar } from '/components/nav-bar.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')


//=========FETCH POST BY ID============//
fetch(`http://localhost:3000/post/${id}`) //récupère post par id
  .then(response => response.json())
  .then(post => {

  const postSeul = document.getElementById('postToutSeul')
  postSeul.innerHTML = createNewPost(post)



//=========OUVERTURE FORMULAIRE ADD LINK============//
  // Get the modal
const modal = document.getElementById('myModal');

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

//=========AJOUT NAVBAR DYNAMIC==============//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => { //récupère tableau de titre de catégorie (trié au niveau serveur fichier index.js)

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('') //applique fonction createNavBar provenant du component sur chaque catégorie

    categoriesList.innerHTML = categoryList //insert dans HTML
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
