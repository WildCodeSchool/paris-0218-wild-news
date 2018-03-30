fetch('http://localhost:3000/post')
  .then(response => response.json())
  .then(posts => {
    const postsElement = document.getElementById('posts')
    postsElement.innerHTML = JSON.stringify(posts)
  })