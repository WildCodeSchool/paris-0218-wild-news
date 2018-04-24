export
  const createNavBar = (myCategory) =>
    `
    <li>
      <a href="http://localhost:5000/category.html?name=${myCategory}" class="title-nav-bar">${myCategory}</a>
    </li>
    `
