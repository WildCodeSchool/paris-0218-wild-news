const mysql = require('mysql2/promise')

// connection database with a promise
const pendingConnection = mysql.createConnection({
  user: 'server',
  host: 'localhost',
  database: 'wildnews',
  password: 'mysql',
  namedPlaceholders: true
})

const keyToKeyValue = k => `${k}=:${k}`
const where = params => Object.keys(params).map(keyToKeyValue).join(' AND ')

const exec = async (query, params) => {
  const connection = await pendingConnection
  console.log('executing', query, params)
  const result = await connection.execute(query, params)
  return result[0]
}

// const createUser = params => exec(`
//   INSERT INTO user (username, firstName, lastName, email, password)
//   VALUES (:username, :firstName, :lastName, :email, :password)`, params)
// const readUser = () => exec(`SELECT * FROM user`)
// const readUserById = id => exec(`SELECT * FROM user WHERE id=:id`, { id })
// const readUserby = params => exec(`SELECT * FROM user WHERE ${where(params)}`, params)
//
// module.exports = {
//   user: {
//     create: createUser,
//     read: readUser,
//     readBy: readUserby,
//     readById: readUserById
//   }
// }

// les posts en SQL

// const getLastestPosts = (limit) => exec('SELECgetLastestPosts(3)
// //   .then(result => console.log('result:', result))
// //   .catch(console.error)T * FROM post ORDER BY createdAt DESC LIMIT ?', [limit]) // à utiliser pour le carousel et les onglets de cat dans home
//

const createPost = params => exec(`
  INSERT INTO post (title, description, imageURL, sourceURL)
  VALUES (:title, :description, :imageURL, :sourceURL)`, params)
const getPosts = () => exec('SELECT * FROM post')
const readPostById = async id => {
  const results = await exec(`SELECT * FROM post WHERE id=:id LIMIT 1`, { id })
  return results[0]
}
const readPostby = params => exec(`SELECT * FROM post WHERE ${where(params)}`, params)

// createPost({title: 'youpi', description: "c'est cool", imageURL: 'https://cdn-images-1.medium.com/max/800/1*XlRCFF0t8Jkj1EKPt-0Pmw.png', sourceURL: 'https://uxplanet.org/mobile-ui-design-trends-in-2018-ccd26031dfd8'})
//   .then(result => console.log('result:', result))
//   .catch(console.error)

getPosts()
  .then(todos => console.log('todos:', todos))

module.exports = {
  createPost,
  readPostby,
  readPostById
}

module.exports = {
  getPosts
}
