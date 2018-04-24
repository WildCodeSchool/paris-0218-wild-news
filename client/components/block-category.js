export
  const createNewPost = (myPost) =>
    `
    <div class="row article-caption">
      <a href="/post.html?id=${myPost.id}" class="article-link">
        <div id="image" class="column column-25"><img src="${myPost.image}" alt="${myPost.title}" class="article-img"></div>
        <div class="column column-75">
          <h4 id="posts">${myPost.title}</h4>
          <p id="description">${myPost.text}</p>
        </div>
      </a>
    </div>
    `
