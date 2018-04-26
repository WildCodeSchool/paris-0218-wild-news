const mysql = require('mysql2/promise')

// connection database with a promise
const pendingConnection = mysql.createConnection({

  user: 'server',
  host: 'localhost',
  database: 'wildnews',
  password: 'mysql',
  namedPlaceholders: true

})
