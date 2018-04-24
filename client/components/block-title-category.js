export
  const createNewTitle = (myPost) =>
    `
    <h2 class="cat-title">${myPost.toUpperCase()}</h2>
    <img src="assets/${myPost}.png" alt="${myPost}" class="cat-img">
    `
