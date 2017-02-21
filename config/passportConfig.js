var LocalStrategy = require('passport-local').Strategy
// var FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, next) { // this needs to be placed before passport.use('local-signup'),... below.  Session needs to be updated after new user created
    next(null, user.id)
  })

  passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, user) {
      next(err, user)
    })
  })
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenpassword, next) {
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) return next(err)

      // No user found
      if (!foundUser) {
        return next(err, false, req.flash('flash', {
          type: 'warning',
          message: 'No user found by this email'
        }))
      }
      // if can find by email, check the password.
      // If password not same as one in db, fail and access deneid
      if (!foundUser.validPassword(givenpassword)) {
        return next(null, false, req.flash('flash', {
          type: 'danger',
          message: 'Access denied, wrong password'
        }))
      }
      return next(err, foundUser, req.flash('flash', {
        type: 'success',
        message: 'Successfully logged in. Welcome to CrowdSub!'
      }))
    })
  }))

  passport.use('local-signup', new LocalStrategy({  // Setting strategy here called 'local-signup'. This is a middleware as seen by '.use'
    usernameField: 'email',  // note it is important the form name in auth.ejs matches this 'email'
    passwordField: 'password', // ensure matches 'password' name in auth.ejs form
    passReqToCallback: true // pass output of request callback
  }, function (req, email, password, next) {
  // in passport documentation, 2nd parameter actually is username but we want to set this 'username' to 'email' instead.

    // 1. Find user with email as given from the callback
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) throw err
      // note the string 'local.email', can't dot notation here.
      // 2. Inside callback, if there's a user with the email, call next() middleware with no error args and update the flash data
      if (foundUser) {
        console.log('user with same email found')
        // Below parameters agree correspondingly with function(err,theNewUser,flashData)
        return next(null, false, req.flash('flash', {
          type: 'warning',   // note partials/flash.ejs has been inserted inside signup.ejs so it appears
          message: 'This email is already used!'
        }))
      } else {
        // if not found , save as new user. Save user to db as per normal, but password is hashed
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password)  // calling encrypted password from user.js model. Notice bcrypt not required on this passportConfig.js page, because  encrypt passed as statics method to User
          }
        })
        newUser.save(function (err, output) {
          if (err) {
            throw err
          }
          return next(null, output, req.flash('flash', {
            type: 'success',
            message: 'Successfully registered ' + output.local.email + ' with CrowdSub!'
          }))
        })
        console.log(newUser)
      }
    })
  }))
}
