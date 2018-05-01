export
const createNewTitle = (category) =>
  `
  <h2 class="cat-title" data-id="${category.id}">${category.title.toUpperCase()}</h2>
  <img src="${category.imageURL}" alt="${category.title}" class="cat-img">
  `
