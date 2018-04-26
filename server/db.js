const mysql = require('mysql2/promise')

// connection database with a promise
const pendingConnection = mysql.createConnection({

  user: 'server',
  host: 'localhost',
  database: 'wildnews',
  password: 'mysql',
  namedPlaceholders: true

})

const exec = async (query, params) => {
  const connection = await pendingConnection
  console.log('executing', query)
  const result = await connection.execute(query, params)
  return result[0]
}

const createUser = params => exec(`
  INSERT INTO user (username, firstName, lastName, email, password)
  VALUES (:username, :firstName, :lastName, :email, :password)`, params)
const readUser = () => exec(`SELECT * FROM user`)
readUser.byId = id => exec(`SELECT * FROM user WHERE id=:id`, { id })
