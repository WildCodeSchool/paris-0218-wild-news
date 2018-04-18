import { createNewPost } from '/components/block-article-seul.js'

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
