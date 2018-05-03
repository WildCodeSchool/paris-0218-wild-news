// ==============MODULES==============//
const express = require('express')
const PrettyError = require('pretty-error')
const pe = new PrettyError()
const app = express()
const db = require('./db.js')

// ==============HEADER==============//
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// ==============ACCUMULATOR==============//
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try {
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
      next(err)
    }
  })
})

// ==============HOME==============//
app.get('/', (request, response) => {
  response.send('OK')
})

// ==============GET ALL POSTS==============//
app.get('/posts', (request, response, next) => {
  db.post.readAll()
    .then(posts => response.json(posts))
    .catch(next)
})
// ==============GET CATEGORY BY ID==============//
app.get('/category/:title', (request, response, next) => {
  db.category.readBy(request.params)
    .then(categories => {
      let category = categories[0]
      db.post.readBy({category: category.id})
        .then(posts => {
          category.posts = posts
          response.json(category)
        })
        .catch(next)
    })
    .catch(next)
})

// =============GET POST BY ID==============//
app.get('/post/:id', (request, response, next) => {
  db.post.readBy(request.params)
    .then(posts => {
      let post = posts[0]
      db.comment.readBy({post: post.id})
        .then(comments => {
          post.comments = comments
          response.json(post)
        })
        .catch(next)
    })
    .catch(next)
})
//   try {
//     const post = await db.post.readBy(request.params)
//     response.json(post[0])
//   } catch (err) {
//     next(err)
//   }

// ==============GET NAV BAR==============//
// +++TEST TO SORT DATA ON SERVER SIDE++++/
app.get('/categories', (request, response, next) => {
  db.category.readAll()
    .then(categories => response.json(categories))
    .catch(next)
})

// =============GET COMMENT==============//
app.get('/comment', (request, response, next) => {
  db.comment.readAll()
    .then(comments => response.json(comments))
    .catch(next)
})

// ==============POST NEW POST==============//
app.post('/post', (request, response, next) => {
  let content = request.body
  content.createdAt = (new Date()).toISOString().substring(0, 10)
  console.log(content)
  db.post.create(content)
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============POST NEW CATEGORY==============//
app.post('/category', (request, response, next) => {
  db.category.create(request.body)
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============POST NEW COMMENT==============//
app.post('/comment', (request, response, next) => {
  db.comment.create({
    author: request.body.author,
    content: request.body.content
  })
    .then(() => response.json('ok'))
    .catch(next)
})

// ==============ERROR HANDLING============== //
app.use((error, request, response, next) => {
  if (error) {
    console.log(pe.render(error))
    if (error.code === 'ENOENT') {
      return response.status(404).json({message: error.message})
    }
    return response.status(500).json({message: error.message})
  }
  next()
})

// ==============PORT==============//
app.listen(3000, () => console.log('listening on 3000'))
