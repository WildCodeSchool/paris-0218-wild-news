export const createPostElement = post =>
  `<div class="row article-caption">
        <img src="${post.image}" class="column column-25 article-img" alt="article">
        <div class="column column-75">
            <h4><a href="article.html?id=${post.id}">${post.title}</a></h4>
            <p>${post.text}</p>
        </div>
    </div>`

export const createCategoryElement = category =>
  `<article class="column column-100">
      <div class="category">
          <h2 class="cat-title">${category}</h2>
          <img src="http://via.placeholder.com/550x300" alt="${category}" class="cat-img">
          <div class="article container cat-${category.toLowerCase()}"></div>
          <div class="cat-button">
              <button>More</button>
          </div>
      </div>
    </article>`
