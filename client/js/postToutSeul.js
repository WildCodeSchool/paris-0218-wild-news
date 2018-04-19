import { createNewPost } from '/components/block-article-seul.js'
import { createNavBar } from '/components/nav-bar.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

console.log(id)
fetch(`http://localhost:3000/post/${id}`)
  .then(response => response.json())
  .then(post => {

  const postSeul = document.getElementById('postToutSeul')
  postSeul.innerHTML = createNewPost(post)


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

//******************AJOUT NAVBAR DYNAMIC**************//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => {

    const categoriesList = document.getElementById('navbar')

    const categoryList = categories.map(createNavBar).join('')

    categoriesList.innerHTML = categoryList
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
