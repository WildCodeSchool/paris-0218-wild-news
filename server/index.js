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
const db = require('./db')

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
app.get('/post', (request, response, next) => {
  const postsDir = path.join(__dirname, '../', 'mocks/posts') // make the beginning of the path: add / and join everything
  readdir(postsDir) // get every element of the files but only the names (in our case: post1.json)
    .then(files => Promise.all(files
      .map(file => path.join(postsDir, file)) // get the complete path by joining postsDir and file
      .map(filepath => readFile(filepath, 'utf8'))))

    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(next)
})

// ==============GET CATEGORY BY ID==============//
app.get('/category/:name', (request, response, next) => {
  const postsDir = path.join(__dirname, '../', 'mocks/posts') // make the beginning of the path: add / and join everything
  readdir(postsDir) // get every element of the files but only the names (in our case: post1.json)
    .then(files => Promise.all(files // take array of promise and convert it array of values
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))

    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(next)
})

// =============GET POST BY ID==============//
app.get('/post/:id', (request, response, next) => {
  const fileName = `post${request.params.id}.json` // !!!!!!!! For post add with the form we will have to remove the 'post' otherwise the path will not be good
  const filepath = path.join(__dirname, '../', 'mocks/posts', fileName)

  readFile(filepath)
    .then(data => {
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.end(data)
    })
    .catch(next)
})

// =============GET COMMENT==============//
app.get('/comment', (request, response, next) => {
  db.readComment(request)
    .then(comment => response.json(comment))
    .catch(next)
})

// ==============GET NAV BAR==============//
// +++TEST TO SORT DATA ON SERVER SIDE++++/
app.get('/navbar', (request, response, next) => {
  const navBarDir = path.join(__dirname, '../', 'mocks/category') // make the path: /Users/guillaume/Desktop/paris-0218-wild-news/mocks/category
  readdir(navBarDir) // read every files of mocks/category, so category1.json, category2.json and so on
    .then(files => {
      const filepaths = files.map(file => path.join(navBarDir, file)) // for every file join navBarDir and the file name => /Users/guillaume/Desktop/paris-0218-wild-news/mocks/category/ + category1.json
      const allFiles = filepaths.map(filepath => {
        return readFile(filepath, 'utf8') // return the result in utf8
      })

      return Promise.all(allFiles) // Promise: wait for all the data to be ready (otherwise, we get an empty array)
    })
    .then(allFilesValues => {
      const arrTitle = allFilesValues
        .map(JSON.parse)
        .map(article => article.title)

      response.json(arrTitle)
    })
    .catch(next)
})

// ==============POST NEW POST==============//
app.post('/post', (request, response, next) => {
  console.log('ok')
  response.send('ok')
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filename = `${id}.json`
  const filepath = path.join(__dirname, '../mocks/posts', filename)
  const content = {
    id: id,
    title: request.body.title,
    createdAt: Date.now(),
    text: request.body.description,
    image: request.body.image,
    source: request.body.link,
    category: request.body.category,
    author: request.body.author
  }
  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============POST NEW CATEGORY==============//
app.post('/category', (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filename = `${id}.json`
  const filepath = path.join(__dirname, '../mocks/category', filename)
  const content = {
    id: id,
    title: request.body.title,
    createdAt: Date.now(),
    text: request.body.description,
    image: request.body.image
  }
  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============POST NEW COMMENT==============//
app.post('/comment', (request, response, next) => {
  db.createComment({
    author: request.body.author,
    content: request.body.content
  })
    .then(() => response.json('ok'))
    .catch(next)
})

// ==============ERROR HANDLING==============//
app.use((error, request, response, next) => {
  if (error) {
    console.log(pe.render(error))
    if (error.code === 'ENOENT') {
      return response.status(404).json({ message: error.message })
    }
    return response.status(500).json({ message: error.message })
  }
  next()
})

// ==============PORT==============//
app.listen(3000, () => console.log('listening on 3000'))
