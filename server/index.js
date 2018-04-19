const express = require('express')
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)

const app = express()

app.use((request, response, next) => {
  console.log('je set les headers cors')
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use((request, response, next) => {
  console.log('je parse le body')
  if (request.method === 'GET') return next()
  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try{
      request.body = JSON.parse(accumulator)
      console.log('je parse le body')
      next()
    } catch (err) {
      next(err)
    }
  })
})


app.get('/', (request, response) => {
  response.send('OK')
})






// ****************ROUTE POUR ACCUEIL RETOURNE TOUS LES POSTS******************//

app.get('/post', (request, response) => {

  const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout

  readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
    .then(files => Promise.all(files
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))


    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(err => response.status(500).end(err.message))

})









// ****************ROUTE POUR POST SUR ACCUEIL******************//

app.post('/post', (request, response, next) => {

  console.log('ok')
  response.send('ok')

  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filename = `${id}.json`
  const filepath = path.join(__dirname, '../mocks/posts', filename)
  console.log(id)
  const content = {
    id: id,
    title: request.body.title,
    createdAt: Date.now(),
    text: request.body.description,
    image : request.body.image,
    source: request.body.lien,
    category : request.body.categorie,
    author: request.body.auteur
  }
  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})


// ****************ROUTE POUR ADD CATEGORIE******************//

app.post('/category', (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filename = `${id}.json`
  const filepath = path.join(__dirname, '../mocks/category', filename)
  console.log(id)
  const content = {
    id: id,
    title: request.body.title,
    createdAt: Date.now(),
    text: request.body.description,
    image : request.body.image
  }
  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})





















// ****************ROUTE POUR LES CATEGORY AVEC PARAMETRE******************//

app.get('/category/:name', (request, response) => {

  const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout

  readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
    .then(files => Promise.all(files
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))


    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(err => response.status(500).end(err.message))

})



// ***ROUTE POUR LES PAGES POST INDIVIDUELS RETOURNE LES POSTS AVEC LE MEME PARAMETRE**//

app.get('/post/:id', (request, response) => {
  const fileName = `post${request.params.id}.json`
  const filepath = path.join(__dirname,'../', 'mocks/posts', fileName)

  readFile(filepath)
    .then(data => {
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.end(data)
    })
    .catch(err=> {
      response.status(404).end('Post introuvable')
    })

})



app.listen(3000, () => console.log("j'écoute sur le port 3000"))


