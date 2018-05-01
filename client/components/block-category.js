export
const createNewPost = (post) =>
  `
  <div class="row article-caption">
    <a href="/post.html?id=${post.id}" class="article-link">
      <div id="image" class="column column-25"><img src="${post.imageURL}" alt="${post.title}" class="article-img"></div>
      <div class="column column-75">
        <h4 id="posts">${post.title}</h4>
        <p id="description">${post.description}</p>
      </div>
    </a>
  </div>
  `
