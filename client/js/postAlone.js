/* global URLSearchParams */

// =========IMPORT COMPONENTS==============//
import '/js/common.js'
import { config } from '/parameters.js'
import { createNewPost } from '/components/block-article-alone.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

// =========FETCH POST BY ID============//
window.fetch(`${config.serverHost}/post/${id}`) // get post id
  .then(response => response.json())
  .then(post => {
    const postBlock = document.getElementById('post-alone')
    postBlock.innerHTML = createNewPost(post)
  })
