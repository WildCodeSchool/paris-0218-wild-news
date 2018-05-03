import { config } from '/parameters.js'
import '/components/header.js'
import { createNavBar } from '/components/nav-bar.js'

window.config = config

// =========ADD NAVBAR DYNAMIC==============//
window.fetch(`${config.serverHost}/categories`)
  .then(response => response.json())
  .then(categories => { // get array of categories title (sort on server side in app.js)
    const categoriesList = document.getElementById('navbar')
    const categoryList = categories.map(createNavBar).join('') // apply function createNavbar of component on category
    categoriesList.innerHTML = categoryList // insert in HTML
  })

// =========BUTTON TO ADD A CATEGORY============== //
document.getElementById('add-category').addEventListener('submit', event => { // get button id and event
  event.preventDefault() // prevent reload of the page when submit

  // get values of the form (in our case: title, description...)
  const title = document.getElementById('title-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value

  // Use fetch to post data into the mock
  window.fetch(`${config.serverHost}/category`, {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image
    })
  }).then(res => {
    if (res.status === 200) {
      window.parent.location.reload()
    }
  })
})

// =========OPEN FORM TO ADD CATEGORY============== //
// Get the modal
const modalCat = document.getElementById('my-modal-cat')

// Get the button that opens the modal
const btnCat = document.getElementById('btn-category')

// Get the <span> element that closes the modal
const closeCat = document.getElementsByClassName('close-cat')[0]

// When the user clicks the button, open the modal
btnCat.onclick = function () {
  modalCat.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
closeCat.onmousedown = function () {
  modalCat.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modalCat) {
    modalCat.style.display = 'none'
  }
}



