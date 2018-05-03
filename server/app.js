// ==============MODULES==============//
const express = require('express')
const PrettyError = require('pretty-error')
const pe = new PrettyError()
const app = express()
const db = require('./db.js')

// ==============SESSION==============//

const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const secret = 'only for your eyes'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin) // Clever, not a good practise though..
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true') // important
  next()
})

// Setup session handler
app.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ secret }),
}))

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  next()
})

app.get('/', (req, res) => {
  const user = req.session.user || {}

  res.json(user)
})

app.post('/sign-in', (req, res, next) => {
  // does user exists ?
  const user = users.find(u => req.body.login === u.login)

  // Error handling
  if (!user) {
    return res.json({ error: 'User not found' })
  }

  if (user.password !== req.body.password) {
    return res.json({ error: 'Wrong password' })
  }

  // else, set the user into the session
  req.session.user = user

  res.json(user)
})

app.get('/sign-out', (req, res, next) => {
  req.session.user = {}

  res.json('ok')
})

app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: err.message })
    console.error(err)
  }

  next(err)
})

// ==============HEADER==============//
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// ==============ACCUMULATOR==============//
app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })
  request.on('end', () => {
    try {
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
      next(err)
    }
  })
})

// ==============HOME==============//
app.get('/', (request, response) => {
  response.send('OK')
})

// ==============GET ALL POSTS==============//
app.get('/posts', (request, response, next) => {
  db.post.readAll()
    .then(posts => response.json(posts))
    .catch(next)
})
// ==============GET CATEGORY BY ID==============//
app.get('/category/:title', (request, response, next) => {
  db.category.readBy(request.params)
    .then(categories => {
      let category = categories[0]
      db.post.readBy({category: category.id})
        .then(posts => {
          category.posts = posts
          response.json(category)
        })
        .catch(next)
    })
    .catch(next)
})

// =============GET POST BY ID==============//
app.get('/post/:id', async (request, response, next) => {
  try {
    const post = await db.post.readBy(request.params)
    response.json(post[0])
  } catch (err) {
    next(err)
  }
})

// ==============GET NAV BAR==============//
// +++TEST TO SORT DATA ON SERVER SIDE++++/
app.get('/categories', (request, response, next) => {
  db.category.readAll()
    .then(categories => response.json(categories))
    .catch(next)
})

// ==============POST NEW POST==============//
app.post('/post', (request, response, next) => {
  let content = request.body
  content.createdAt = (new Date()).toISOString().substring(0, 10)
  console.log(content)
  db.post.create(content)
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============POST NEW CATEGORY==============//
app.post('/category', (request, response, next) => {
  db.category.create(request.body)
    .then(() => response.json('OK'))
    .catch(next)
})

// ==============ERROR HANDLING============== //
app.use((error, request, response, next) => {
  if (error) {
    console.log(pe.render(error))
    if (error.code === 'ENOENT') {
      return response.status(404).json({message: error.message})
    }
    return response.status(500).json({message: error.message})
  }
  next()
})

// ==============PORT==============//
app.listen(3000, () => console.log('listening on 3000'))
