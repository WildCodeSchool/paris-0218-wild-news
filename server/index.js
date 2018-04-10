const express = require('express')
const post1 = require('../mocks/posts/post1.json')

const posts = post1
const app = express()

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

app.get('/post', (request, response) => {
  response.json(posts)
})

app.listen(3000, () => console.log("j'écoute sur le port 3000"))
