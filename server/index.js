//==============MODULES==============//
const express = require('express')
const fs = require('fs')
const path = require('path')
const util = require('util')                          //  Filesystem
const readFile = util.promisify(fs.readFile)          //  Util. pour les chemins d'accès
const readdir = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)
const app = express()

//==============HEADER==============//
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


//==============ACCUMULATOR==============//
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try{
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
      next(err)
    }
  })
})

//==============HOME==============//
app.get('/', (request, response) => {
  response.send('OK')
})

//==============GET ALL POSTS==============//
app.get('/post', (request, response) => {
  const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout
  readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
    .then(files => Promise.all(files
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))

    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(err => response.status(500).end(err.message))
})

//==============GET CATEGORY BY ID==============//
app.get('/category/:name', (request, response) => {

  const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout

  readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
    .then(files => Promise.all(files //prendre un tableau de promesses et le convertir en tableau de valeur des promesses
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))

    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(err => response.status(500).end(err.message))
})

//=============GET POST BY ID==============//
app.get('/post/:id', (request, response) => {
  const fileName = `post${request.params.id}.json`  //Pour les posts ajouter manuellement via btn add post, virer la partie post
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

//==============GET NAV BAR==============//
//===========Test tri des données sur serveur===========/
app.get('/navbar', (request, response) => {

  const navBarDir = path.join(__dirname,'../', 'mocks/category') // construit chemin vers dossier category : /Users/guillaume/Desktop/paris-0218-wild-news/mocks/category
  readdir(navBarDir) // Lit chaque fichier du dossier mocks/category, donc category1.json, category2.json etc
    .then(files => {

      const filepaths = files.map(file => path.join(navBarDir, file)) //pour chaque fichier joindre navBarDir et le nom du fichier => /Users/guillaume/Desktop/paris-0218-wild-news/mocks/category/ + category1.json
      const allFiles = filepaths.map(filepath => {
        return readFile(filepath, 'utf8') // return tout ça en utf8
      })

      Promise.all(allFiles) // Promise permet d'attendre que toutes les données soient prêtes (sinon renvoie un tableau vide)
      .then(allFilesValues => {
        const valuesInJason = allFilesValues.map(JSON.parse)
        const arrTitle = []
        for (let i=0; i<valuesInJason.length; i++) {          //Remplacer par un .map si possible
          if (valuesInJason[i].title !== null) {
            arrTitle.push(valuesInJason[i].title)
          }
        }
        response.json(arrTitle)
      })

      .catch(err => {
        response.status(500).end(err.message)
      })
    })
})

//==============POST NEW POST==============//
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
    image : request.body.image,
    source: request.body.lien,
    category : request.body.categorie,
    author: request.body.auteur
  }
  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})

//==============POST NEW CATEGORY==============//
app.post('/category', (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filename = `${id}.json`
  const filepath = path.join(__dirname, '../mocks/category', filename)
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

//==============PORT==============//
app.listen(3000, () => console.log("j'écoute sur le port 3000"))
