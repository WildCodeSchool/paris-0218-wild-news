export
const createNavBar = (myCategory) =>
  `
  <li>
    <a href="category.html?name=${myCategory.title}" class="title-nav-bar">${myCategory.title}</a>
  </li>
  `
