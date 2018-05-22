/* global URLSearchParams */
// =========IMPORT COMPONENTS==============//
import '/js/common.js'
import { createNewPost } from '/components/block-category.js'
import { createNewTitle } from '/components/block-title-category.js'
import { config } from '/parameters.js'
const params = new URLSearchParams(window.location.search) // get all params of the URL: name, id and a lot of other thing (do console.log to see)
const categoryName = params.get('name') // get only the param name of URL (in our case the category name)

// =========FETCH OF CATEGORY BY NAME==============//
window.fetch(`${config.serverHost}/category/${categoryName}`)
  .then(response => response.json())
  .then(category => { // get all posts of mock
    const postsElementTips = document.getElementById('posts-tips')
    const titleCategory = document.getElementById('category-title')
    titleCategory.innerHTML = createNewTitle(category)
    postsElementTips.innerHTML = category.posts.map(createNewPost).join('') // apply function of component to every post
  })

// =========OPEN FORM POST LINK==============//
// Get the modal
const modalLink = document.getElementById('my-modal-link')

// Get the button that opens the modal
const btnLink = document.getElementById('my-btn-link')

// Get the <span> element that closes the modal
const spanLink = document.getElementsByClassName('close-link')[0]

// When the user clicks the button, open the modal
btnLink.onclick = function () {
  modalLink.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
spanLink.onclick = function () {
  modalLink.style.display = 'none'
}

// =========ADD LINK============//

// Récupère les valeurs des élèments et l'évènement
document.getElementById('add-link').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('title-article').value
  const description = document.getElementById('description-article').value
  const image = document.getElementById('img-article').value
  const link = document.getElementById('link-article').value
  // const category = document.getElementById('category-article').values
  const author = document.getElementById('author-article').value
  const categoryId = document.getElementsByClassName('cat-title')[0].getAttribute('data-id')

  // Fetch which post data of new link in mock
  window.fetch(`${config.serverHost}/post`, {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image,
      link,
      category: `${categoryId}`,
      author
    })
  }).then(res => {
    if (res.status === 200) {
      window.parent.location.reload()
    }
  })
})
