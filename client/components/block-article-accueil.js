export
const createNewPost = (monPost) =>
` <div class="row article-caption">
     <a href="/post.html?id=${monPost.id}" class="article-link">
     <div id="image" class="column column-25"><img src="${monPost.image}" alt="${monPost.title}" class="article-img"></div>
     <div class="column column-75">
       <h4 id="posts">${monPost.title}</h4>
       <p id="description">${monPost.text}</p>
     </div>
     </a>
  </div>`
