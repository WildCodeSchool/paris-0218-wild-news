/* global fetch */

fetch("http://localhost:3000/post")
  .then(response => response.json())
  .then(posts => {
    const postsElement = document.getElementById("posts")
    postsElement.innerHTML = "Title:"+ posts.title
    const imgElement = document.getElementById("image")
    imgElement.innerHTML = `<img src="${posts.image}">`
    const textElement = document.getElementById("description")
    textElement.innerHTML = posts.text
  })