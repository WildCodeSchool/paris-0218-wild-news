const createArticleElement = posts =>
  `<div class="post">
    <p>${posts.createdAt}</p>
    <img src="${posts.image}" alt="image de l'article"/>
    <h4>${posts.title}</h4>
    <p>${posts.text}</p>
    <a href="${posts.source} "target="_blank"></a>
    <p>${posts.author}</p>
    </div>`
