#!/usr/bin/env node

const fs = require('fs') // fs = File system vous pouvez voir la doc sur MDN ou ce lien sur stackoverflow qui explique ce qui est fait juste en dessous https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const express = require('express')
const app = express()

let posts = {} //permet de recuperer l'objet contenant les catégories avec leur posts (fait plus bas a l'aide du forEach et du push)

const categoriesFolder = '../mocks/posts/'

fs.readdir(categoriesFolder, (err, categories) => {
  categories.forEach(category => {
    fs.readdir(categoriesFolder + category, (err, files) => {
      posts[category] = []
      files.forEach(file => {
        posts[category].push(require(categoriesFolder + category + '/' + file))
      })
    })
  })
}) // voir l'article stackoverflow plus haut

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/', (request, response) => {
  response.send('OK')
})

app.get('/posts', (request, response) => {
  response.json(posts)
})

app.listen(3000, () => console.log('j\'écoute sur le port 3000'))
