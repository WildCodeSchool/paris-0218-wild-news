// =========IMPORT COMPONENTS==============//
import { createNewPost } from '/components/block-category.js'
import { createNewTitle } from '/components/block-title-category.js'
import { createNavBar } from '/components/nav-bar.js'
const params = new URLSearchParams(window.location.search) // get all params of the URL: name, id and a lot of other thing (do console.log to see)
const name = params.get('name') // get only the param name of URL (in our case the category name)

// =========FETCH OF CATEGORY BY NAME==============//
fetch(`http://localhost:3000/category/${name}`)
  .then(response => response.json())
  .then(posts => { // get all posts of mock
    const postsElementTips = document.getElementById('posts-tips')
    const titleCategory = document.getElementById('category-title')
    const postsCategory1 = posts.filter(post => post.category === `${name}`) // filter posts by category (we only keep the ones of the category in the URL)
    const postElementTips = postsCategory1.map(createNewPost).join('') // apply function of component to every post
    titleCategory.innerHTML = createNewTitle(`${name}`) // insert title of category in HTML
    postsElementTips.innerHTML = postElementTips // insert posts HTML
  })

// =========ADD NAVBAR DYNAMIC==============//
fetch('http://localhost:3000/navbar')
  .then(response => response.json())
  .then(categories => { // get array of categories title (sort on server side in index.js)
    const categoriesList = document.getElementById('navbar')
    const categoryList = categories.map(createNavBar).join('') // apply function createNavbar of component on category
    categoriesList.innerHTML = categoryList // insert in HTML
  })

// =========ADD CATEGORY VIA BUTTON ADD==============//
document.getElementById('add-category').addEventListener('submit', event => { // get button ID and event
  event.preventDefault() // prevent reload of page on submit
  // get values of form: title, description,...
  const title = document.getElementById('title-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value
  // Fetch which post data of new category
  fetch('http://localhost:3000/category', {
    method: 'post',
    body: JSON.stringify({
      title,
      description,
      image
    })
  }).then(res => console.log(res.status))
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
// regroup function of category and post to avoid conflict
window.onclick = function (event) {
  if (event.target === modalCat) {
    modalCat.style.display = 'none'
  } else if (event.target === modalLink) {
    modalLink.style.display = 'none'
  }
}
// =========OPEN FORM POST LINK==============//
// Get the modal
const modalLink = document.getElementById('myModalLink')

// Get the button that opens the modal
const btnLink = document.getElementById('myBtnLink')

// Get the <span> element that closes the modal
const spanLink = document.getElementsByClassName('closeLink')[0]

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

// Fetch which post data of new link in mock
    fetch('http://localhost:3000/post', {
      method: 'post',
      body: JSON.stringify({
        title,
        description,
        image,
        link,
        category: `${name}`,
        author
      })
    }).then(res => console.log(res.status))
})
