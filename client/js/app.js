//=========IMPORT LES COMPONENTS==============//
import { createNewPost } from '/components/block-article-accueil.js'
import { createNavBar } from '/components/nav-bar.js'

//=========FETCH DE TOUS LES POSTS==============//
fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {        //recupère tous les posts

    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'tips') // filtre les posts par catégorie (uniquement les posts de la catégorie tips)
    const sortCategory1 = postsCategory1.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3) // order in descending order and slice array of tips posts
    const postElementTips = sortCategory1.map(createNewPost).join('') //récupère fonction du module et l'applique à chaque post

    //Fait la même chose mais avec les articles de la catégorie javascript
    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const sortCategory2 = postsCategory2.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
    const postElementJavascript = sortCategory2.map(createNewPost).join('')

    //Insert dans le HTML
    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
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

//=========OUVERTURE FORMULAIRE ADD CATEGORY==============//
// Get the modal
const modal = document.getElementById('myModalCat');

// Get the button that opens the modal
const btn = document.getElementById("btn-category");

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

//=========FETCH NAVBAR DYNAMIC==============//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => { //récupère un tableau avec seulement les noms des catégories (triées directement dans le serveur)

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('') //récupère fonction du module et l'applique aux données

    categoriesList.innerHTML = categoryList //insert dans le HTML
  })
