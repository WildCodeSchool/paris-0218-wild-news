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

const createCat = params => exec(`
  INSERT INTO category (title, description, imageURL)
  VALUES (:title, :description, :imageURL)`, params)

const readCat = () => exec(`SELECT * FROM category`)
const readCatById = id => exec(`SELECT * FROM category WHERE id=:id`, { id })
const updateCat = params => exec(`UPDATE category SET title=?, description=?, imageURL=? WHERE id=?`, [ params.title, params.description, params.imageURL, params.id ])

const createUser = params => exec(`
  INSERT INTO user (username, firstName, lastName, email, password)
  VALUES (:username, :firstName, :lastName, :email, :password)`, params)
const readUser = () => exec(`SELECT * FROM user`)
const readUserById = id => exec(`SELECT * FROM user WHERE id=:id`, { id })
const readUserby = params => exec(`SELECT * FROM user WHERE ${where(params)}`, params)

module.exports = {
  category: {
    createCat: createCat,
    readCat: readCat,
    readCatById: readCatById,
    updateCat: updateCat
  },
  user: {
    create: createUser,
    read: readUser,
    readBy: readUserby,
    readById: readUserById
  }
}

// createUser({username: 'ok', firstName: 'ok', lastName: 'okcom', email: 'ok', password: 'ok' })
//   .then(result => console.log('result:', result))
//   .catch(console.error)

// updateCat({id: '1', title: 'modifok', description: 'okcom', imageURL: 'ok' })
//   .then(result => console.log('result:', result))
//   .catch(console.error)

// readCat()
//   .then(result => console.log(result))
//   .catch(console.error)
