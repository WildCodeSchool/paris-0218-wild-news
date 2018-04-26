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

const createUser = params => exec(`
  INSERT INTO user (username, firstName, lastName, email, password)
  VALUES (:username, :firstName, :lastName, :email, :password)`, params)
const readUser = () => exec(`SELECT * FROM user`)
const readUserById = id => exec(`SELECT * FROM user WHERE id=:id`, { id })
const readUserby = params => exec(`SELECT * FROM user WHERE ${where(params)}`, params)

module.exports = {
  user: {
    create: createUser,
    read: readUser,
    readBy: readUserby,
    readById: readUserById
  }
}
