import { createNewPost } from '/components/block-category.js'
import { createNewTitle } from '/components/block-title-category.js'

const params = new URLSearchParams(window.location.search)
const name = params.get('name')
fetch(`http://localhost:3000/category/${name}`)
  .then(response => response.json())
  .then(posts => {
        console.log(posts)



    const postsElementTips = document.getElementById('posts-tips')
    const titleCategory = document.getElementById('category-title')

    const postsCategory1 = posts.filter(post => post.category === `${name}`)
    const postElementTips = postsCategory1.map(createNewPost).join('')

    titleCategory.innerHTML = createNewTitle(`${name}`)
    postsElementTips.innerHTML = postElementTips


  })
