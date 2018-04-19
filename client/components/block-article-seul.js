export
const createNewPost = (monPost) =>
` <div class="article-caption row">
     <a href="${monPost.source}" target="_blank">
     <div id="image"><img src="${monPost.image}" alt="${monPost.title}"></div>
     <div class="column column-75">
       <h4 id="posts">${monPost.title}</h4>
       <p id="description">${monPost.text}</p>
     </div>
     </a>
</div>`
