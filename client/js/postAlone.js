// =========IMPORT COMPONENTS==============//
import { createNewPost } from '/components/block-article-alone.js'
import { createNavBar } from '/components/nav-bar.js'
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

// =========FETCH POST BY ID============//
fetch(`http://localhost:3000/post/${id}`) // get post id
  .then(response => response.json())
  .then(post => {
  const postSeul = document.getElementById('postAlone')
  postSeul.innerHTML = createNewPost(post)
})

// =========ADD CATEGORY VIA BUTON==============//
document.getElementById('add-category').addEventListener('submit', event => { // get button and event
  event.preventDefault() // prevent reload of the page after submit
  // get values of the form: title, description...
  const title = document.getElementById('title-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value
  // Fetch which post data of the new category
  fetch('http://localhost:3000/category', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image
    })
  }).then(res => console.log(res.status))
})

// =========ADD NAVBAR DYNAMIC==============//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => { // get array of categories title (see index.js)
    const categoriesList = document.getElementById('navbar')
    const categoryList = categories.map(createNavBar).join('') // apply function createNavBar from component on each catégory
    categoriesList.innerHTML = categoryList // insert in HTML
  })

// =========OPEN FORM ADD CATEGORY============//

// Get the modal
const modalCat = document.getElementById('myModalCat')

// Get the button that opens the modal
const btnCat = document.getElementById('btn-category')

// Get the <span> element that closes the modal
const spanCat = document.getElementsByClassName('closeCat')[0]

// When the user clicks the button, open the modal
btnCat.onclick = function () {
  modalCat.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
spanCat.onclick = function () {
  modalCat.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (eventCat) {
  if (eventCat.target === modalCat) {
    modalCat.style.display = 'none'
  }
}
