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

exports.category = {}
exports.category.create = params => exec(`
  INSERT INTO category (title, description, imageURL)
  VALUES (:title, :description, :image)`, params)

exports.category.read = () => exec(`SELECT * FROM category`)
exports.category.readById = id => exec(`SELECT * FROM category WHERE id=:id`, {id})
exports.category.readBy = params => exec(`SELECT * FROM category WHERE ${where(params)}`, params)
exports.category.update = params => exec(`UPDATE category SET title=?, description=?, imageURL=? WHERE id=?`, [params.title, params.description, params.imageURL, params.id])

exports.user = {}
exports.user.create = params => exec(`
  INSERT INTO user (username, firstName, lastName, email, password)
  VALUES (:username, :firstName, :lastName, :email, :password)`, params)
exports.user.read = () => exec(`SELECT * FROM user`)
exports.user.readById = id => exec(`SELECT * FROM user WHERE id=:id`, {id})
exports.user.readBy = params => exec(`SELECT * FROM user WHERE ${where(params)}`, params)


const createPost = params => exec(`
  INSERT INTO post (title, description, imageURL, sourceURL)
  VALUES (:title, :description, :imageURL, :sourceURL)`, params)
const getPosts = () => exec('SELECT * FROM post')
const readPostById = async id => {
  const results = await exec(`SELECT * FROM post WHERE id=:id LIMIT 1`, { id })
  return results[0]
}
const readPostby = params => exec(`SELECT * FROM post WHERE ${where(params)}`, params)

// createUser({username: 'ok', firstName: 'ok', lastName: 'okcom', email: 'ok', password: 'ok' })
//   .then(result => console.log('result:', result))
//   .catch(console.error)

// updateCat({id: '1', title: 'modifok', description: 'okcom', imageURL: 'ok' })
//   .then(result => console.log('result:', result))
//   .catch(console.error)

// readCat()
//   .then(result => console.log(result))
//   .catch(console.error)
