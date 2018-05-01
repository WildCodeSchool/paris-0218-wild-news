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
exports.category.readAll = () => exec(`SELECT * FROM category`)
exports.category.readBy = params => exec(`SELECT * FROM category WHERE ${where(params)}`, params)
exports.category.update = params => exec(`UPDATE category SET title=?, description=?, imageURL=? WHERE id=?`, [params.title, params.description, params.imageURL, params.id])

exports.user = {}
exports.user.create = params => exec(`
  INSERT INTO user (username, firstName, lastName, email, password)
  VALUES (:username, :firstName, :lastName, :email, :password)`, params)
exports.user.readAll = () => exec(`SELECT * FROM user`)
exports.user.readBy = params => exec(`SELECT * FROM user WHERE ${where(params)}`, params)

exports.post = {}
exports.post.create = params => exec(`
  INSERT INTO post (title, description, imageURL, sourceURL, category, author, createdAt)
  VALUES (:title, :description, :image, :link, :category, :author, :createdAt)`, params)
exports.post.readAll = () => exec('SELECT * FROM post')
exports.post.readBy = params => exec(`SELECT * FROM post WHERE ${where(params)}`, params)
