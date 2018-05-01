// ==============MODULES==============//
const express = require('express')
const fs = require('fs')
const path = require('path')
const PrettyError = require('pretty-error')
const util = require('util')// Filesystem
const readFile = util.promisify(fs.readFile)// Util. for path
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)
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
app.get('/post', (request, response) => {
  db.getPosts()
    .then(posts => response.json(posts))
// const postsDir = path.join(__dirname, '../', 'mocks/posts') // make the beginning of the path: add / and join everything
// readdir(postsDir) // get every element of the files but only the names (in our case: post1.json)
//   .then(files => Promise.all(files
//     .map(file => path.join(postsDir, file)) // get the complete path by joining postsDir and file
//     .map(filepath => readFile(filepath, 'utf8'))))
//
//   .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
//   .catch(next)
})
// ==============GET CATEGORY BY ID==============//
app.get('/category/:title', (request, response, next) => {
  db.category.readBy(request.params)
    .then(category => response.json(category))
    .catch(next)
})

// =============GET POST BY ID==============//
app.get('/post/:id', async (request, response, next) => {
  try {
    const post = await db.readPostby(request.params.id)
    response.json(post)
  } catch (err) {
    next(err)
  }
})
// const fileName = `post${request.params.id}.json` // !!!!!!!! For post add with the form we will have to remove the 'post' otherwise the path will not be good
//   const filepath = path.join(__dirname, '../', 'mocks/posts', fileName)
//   const filepath = path.join(__dirname, '../', 'mocks/posts', fileName)
//   readFile(filepath)
//     .then(data => {
//       response.header('Content-Type', 'application/json; charset=utf-8')
//       response.end(data)
//     })
//     .catch(next)
//     .catch(next)
//     .catch(next)
// ==============GET NAV BAR==============//
// +++TEST TO SORT DATA ON SERVER SIDE++++/
app.get('/categories', (request, response, next) => {
  db.category.read()
    .then(categories => response.json(categories))
    .catch(next)
})

// ==============POST NEW POST==============//
app.post('/post', (request, response, next) => {
  db.createPost({
    id: 1,
    createdAt: Date.now(),
    title: request.body.title,
    description: request.body.description,
    imageURL: request.body.imageURL,
    sourceURL: request.body.sourceURL,
    category: request.body.category,
    author: request.body.author
  })
    .then(() => response.json('OK'))
    .catch(next)
})
// console.log('ok')
// const id = Math.random().toString(36).slice(2).padEnd(11, '0')
// const filename = `${id}.json`
// const filepath = path.join(__dirname, '../mocks/posts', filename)
// const content = {
//   id: id,
//   title: request.body.title,
//   createdAt: Date.now(),
//   text: request.body.description,
//   image: request.body.image,
//   source: request.body.link,
//   category: request.body.category,
//   author: request.body.author
// }
// writeFile(filepath, JSON.stringify(content), 'utf8')

// ==============POST NEW CATEGORY==============//
app.post('/category', (request, response, next) => {
  db.category.create(request.body)
    .then(() => response.json('OK'))
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
