export
const createNewPost = (post) =>
  `
  <div class="article-caption row">
    <a href="${post.sourceURL}" target="_blank">
      <div id="image"><img src="${post.imageURL}" alt="${post.title}"></div>
      <div class="column column-75">
        <h4 id="posts">${post.title}</h4>
        <p id="description">${post.description}</p>
      </div>
    </a>
  </div>
  `
