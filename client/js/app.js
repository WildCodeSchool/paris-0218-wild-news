import { createNewPost } from '/components/block-article-accueil.js'

fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'tips')
    const postElementTips = postsCategory1.map(createNewPost).join('')

    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const postElementJavascript = postsCategory2.map(createNewPost).join('')

    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
  })

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


//******************OUVERTURE DU FORMULAIRE**************//
// Get the modal
const modal = document.getElementById('myModal');

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
