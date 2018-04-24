// =========IMPORT COMPONENTS============== //
import { createNewPost } from '/components/block-article-index.js'
import { createNavBar } from '/components/nav-bar.js'

// =========FETCH OF ALL POSTS============== //
fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {  // get all posts
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'tips') // filter posts by category (in that case only posts of 'tips' category)
    const sortCategory1 = postsCategory1.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3) // order in descending order and slice array of tips posts
    const postElementTips = sortCategory1.map(createNewPost).join('') // get function of module and apply on every post
    // Do the same thing but with post of 'javascript' category
    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const sortCategory2 = postsCategory2.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
    const postElementJavascript = sortCategory2.map(createNewPost).join('')
    // Insert in HTML
    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
  })

// =========BUTTON TO ADD A CATEGORY============== //
document.getElementById('add-category').addEventListener('submit', event => { // get button id and event
  event.preventDefault() // prevent reload of the page when submit

  // get values of the form (in our case: title, description...)
  const title = document.getElementById('title-category').value
  const description = document.getElementById('description-category').value
  const image = document.getElementById('img-category').value

  // Use fetch to post data into the mock
  fetch('http://localhost:3000/category', {
    method: 'post',
      body: JSON.stringify({
        title,
        description,
        image
      })
    }).then(res => console.log(res.status))
  })

// =========OPEN FORM TO ADD CATEGORY============== //
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
window.onclick = function (event) {
  if (event.target === modalCat) {
    modalCat.style.display = 'none'
  }
}

// ========= FETCH NAVBAR DYNAMIC============== //
// +++++++++TEST TO SORT DATA ON SERVER SIDE+++++++ //
  fetch('http://localhost:3000/navbar')
    .then(response => response.json())
    .then(categories => { // get array with only categories names (array is create on server side: see app.js)
      const categoriesList = document.getElementById('navbar')
      const categoryList = categories.map(createNavBar).join('') // get module function and apply it to every element
      categoriesList.innerHTML = categoryList // insert in HTML
    })
