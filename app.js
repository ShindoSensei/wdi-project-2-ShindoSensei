// Setup the app
require('dotenv').config({silent: true}) // read .env file first
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

// For flash data
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)   // connect-mongo needs session, so make sure it is below. Stores session into mongo database

// Connecting to mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

// Middleware
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser('process.env.SESSION_SECRET'))

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ // Storing the mongostore in, so we don't have to keep signing in when we do npm start again and restart server.
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// initialize passport into applications. These 2 lines need to come after session
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)    // this line looks into passportConfig.js
app.use(flash())

app.use(methodOverride('_method'))
app.use(logger('dev')) // Show the http request status in console
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  res.locals.user = req.user
  // The res.locals.user here is same as when we do res.render(..,{user:user}), whereby we allow all requests to be able to access a property called user(since app.use is a middleware), which in this case, we are assigning to req.user which passport has created after deserializing user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// Route to authentication pages
const Auth = require('./routes/auth_router')
app.use('/', Auth)

// Route to homepage
const vikiAuth = require('./controllers/vikiauth_controller')
app.get('/', vikiAuth)

// Route to video pages
const videoRoute = require('./routes/video_router')
app.use('/videos', videoRoute)

const port = process.env.PORT || 5001
app.listen(port, function () {
  console.log('Running on port ' + port)
})
