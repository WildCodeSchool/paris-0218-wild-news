import { createNewPost } from '/components/block-article-accueil.js'
import { createNavBar } from '/components/nav-bar.js'

fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {
    const postsElementTips = document.getElementById('posts-tips')
    // filter posts by tips category
    const postsCategory1 = posts.filter(post => post.category === 'tips')
    // order in descending order and slice array of tips posts
    const sortCategory1 = postsCategory1.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
    const postElementTips = sortCategory1.map(createNewPost).join('')

    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const sortCategory2 = postsCategory2.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
    const postElementJavascript = sortCategory2.map(createNewPost).join('')

    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
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


//******************OUVERTURE DU FORMULAIRE CREATION CATEGORIE**************//
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


//******************AJOUT NAVBAR DYNAMIC**************//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => {

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('')

    categoriesList.innerHTML = categoryList
  })
