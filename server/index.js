#!/usr/bin/env node

const fs = require('fs')
const express = require('express')
const app = express()



let allUsers = []
const usersFolder = '../mocks/users/'

fs.readdir(usersFolder, (err, users) => {
  users.forEach(user => {
    allUsers.push(require(usersFolder + user))
  })
})

let posts = {}
let allPosts = {}
const categoriesFolder = '../mocks/posts/'

fs.readdir(categoriesFolder, (err, categories) => {
  categories.forEach(category => {
    fs.readdir(categoriesFolder + category, (err, files) => {
      posts[category] = []
      files.forEach(file => {
        const post = require(categoriesFolder + category + '/' + file);
        posts[category].push(post)
        allPosts[post.id] = post;
      })
    })
  })
})

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

app.get('/article/:id', (request, response) => {
  console.log(allPosts)
  response.json(allPosts[request.params.id])
})

app.get('/posts', (request, response) => {
  response.json(posts)
})

app.get('/users', (request, response) => {
  response.json(allUsers)
})

app.get('/static/:page', (request, response) => {
  let page = fs.readFileSync('../client/static/' + request.params.page).toString()
  page = page.replace('[[useername]]', allUsers[0].username)
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(page);
  response.end();
})

app.listen(3000, () => console.log('j\'écoute sur le port 3000'))
