const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth_controller.js')

// Signup
router.get('/signup', function (req, res) {
  res.render('auth/signup', {
    flash: req.flash('flash')[0]   // the req.flash here is from passportConfig.js, in the
  })
})

router.post('/signup', authController.signup)

// Login
var isLoggedIn = require('../middleware/isLoggedIn')
router.get('/login', isLoggedIn, function (req, res) {
  res.render('auth/login', {
    flash: req.flash('flash')[0]
  })
})

router.post('/login', authController.login)

// Logout
router.get('/logout', function (req, res) {
  // req.logout() // remove the session => req.user will now be = undefined , req.isAuthenticated() will = false
  req.session.destroy(function (err) {
    if (err) { throw err }
    res.redirect('/')
  })
  // res.redirect('/')
})
module.exports = router
