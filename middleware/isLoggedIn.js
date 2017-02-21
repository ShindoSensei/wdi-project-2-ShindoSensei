module.exports = function isLoggedIn (req, res, next) {
  if (req.isAuthenticated() === false) {
    return next()
  }
  req.flash('flash', {
    type: 'danger',
    message: 'You have already logged in'
  })
  res.redirect('/')
}
