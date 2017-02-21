require('dotenv').config({silent: true}) // read .env file first
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

// to serve static files - e.g. CSS, front-end javascript
app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))
app.use(logger('dev')) // Show the http request status in console!

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressLayouts)
app.set('view engine', 'ejs')

// homepage
const vikiAuth = require('./controllers/vikiauth_controller')
app.get('/', vikiAuth)

const videoRoute = require('./routes/video_router')
app.use('/videos', videoRoute)

app.use('/login')

const port = 5001
app.listen(port, function () {
  console.log('Running on port ' + port)
})
