
// =========IMPORT COMPONENTS============== //
import '/js/common.js'
import { config } from '/parameters.js'
import { createNewPost } from '/components/block-article-index.js'

// =========FETCH OF ALL POSTS============== //
window.fetch(`${config.serverHost}/posts`)
  .then(response => response.json())
  .then(posts => { // get all posts
    const postsElementTips = document.getElementById('posts-tips')
    const postsCategory1 = posts.filter(post => post.category === 'tips') // filter posts by category (in that case only posts of 'tips' category)
    const sortCategory1 = postsCategory1.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3) // order in descending order and slice array of tips posts
    const postElementTips = sortCategory1.map(createNewPost).join('') // get function of module and apply on every post
    // Do the same thing but with post of 'javascript' category
    const postsElementJavascript = document.getElementById('posts-javascript')
    const postsCategory2 = posts.filter(post => post.category === 'javascript')
    const sortCategory2 = postsCategory2.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
    const postElementJavascript = sortCategory2.map(createNewPost).join('')
    // Insert in HTML
    postsElementTips.innerHTML = postElementTips
    postsElementJavascript.innerHTML = postElementJavascript
  })
