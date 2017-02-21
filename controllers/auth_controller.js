const passport = require('passport')

let authController = {

  signup: (req, res) => {
    var signupStrategy = passport.authenticate('local-signup', {  // passing all posted data into passport. Passport will be the one to handle the authentication and execute the below redirects/actions accordingly. passport.authenticate looks for 'local-signup' in passportConfig.js, calls the local strategy defined inside and authenticates based on those fields
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true   // Says error message
    })
    return signupStrategy(req, res)
  },

  login: (req, res) => {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
    return loginStrategy(req, res)
  }
}

module.exports = authController
