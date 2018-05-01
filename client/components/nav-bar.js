export
const createNavBar = (myCategory) =>
  `
  <li>
    <a href="category.html?name=${myCategory}" class="title-nav-bar">${myCategory}</a>
  </li>
  `
