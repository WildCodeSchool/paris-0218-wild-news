const express = require('express')
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)

// const post1 = require('../mocks/posts/post1.json')
// const post2 = require('../mocks/posts/post2.json')
// const post3 = require('../mocks/posts/post3.json')
// const post4 = require('../mocks/posts/post4.json')
// const post5 = require('../mocks/posts/post5.json')
// const post6 = require('../mocks/posts/post6.json')
// const post7 = require('../mocks/posts/post7.json')
// const post8 = require('../mocks/posts/post8.json')

// const posts = [post1,post2,post3,post4,post5,post6,post7,post8]

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






// app.get('/post', (request, response) => {

//   const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout

//   readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
//     .then(files => {
//       const filepaths = files.map(file => path.join(postsDir, file))

//       const allFiles = filepaths.map(filepath => {  //crée const allfiles qui pour chaque chemin lit fichier en utf8
//         return readFile(filepath, 'utf8')
//       })

//       Promise.all(allFiles) // prend tablo promesse et le converti en tablo valeur promesse, attend que tout soit rempli avant de publier
//         .then(allFilesValues => {
//           response.json(allFilesValues.map(JSON.parse))
//         })
//         .catch(err => {
//           response.status(500).end(err.message)
//         })
//       })
//      })

//

app.get('/post', (request, response) => {

  const postsDir = path.join(__dirname,'../', 'mocks/posts') // construit URL : path ajoute des / et join réunit tout

  readdir(postsDir) // récupère tous les noms de fichiers mais seulement les noms pas chemin complet , en l'occurence post1.json
    .then(files => Promise.all(files
      .map(file => path.join(postsDir, file))
      .map(filepath => readFile(filepath, 'utf8'))))


    .then(allFilesValues => response.json(allFilesValues.map(JSON.parse)))
    .catch(err => response.status(500).end(err.message))

})








// dans express ':id' dans la route permet de spécifié un paramètre de route
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


