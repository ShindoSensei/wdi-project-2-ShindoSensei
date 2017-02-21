// blocks those who are not logged in
module.exports = function isNotLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {  // isAuthenticated is a passport method
    return next()  // Next here refers to moving to next function, example on line for GET /animals/:id , where isNotLoggedIn is 2nd parameter, next refers to the next parameter which allows entry to subsequent route
  }

  req.flash('flash', {
    type: 'danger',
    message: 'Restricted! Please Login'
  })
  return res.redirect('/login')
}
