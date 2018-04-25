export
const createNewPost = (myPost) =>
  `
  <div class="article-caption row">
    <a href="${myPost.source}" target="_blank">
      <div id="image"><img src="${myPost.image}" alt="${myPost.title}"></div>
      <div class="column column-75">
        <h4 id="posts">${myPost.title}</h4>
        <p id="description">${myPost.text}</p>
      </div>
    </a>
  </div>
  `
