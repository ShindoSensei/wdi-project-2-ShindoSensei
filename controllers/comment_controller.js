let Comment = require('../models/comment')

let commentController = {

  create: (req, res) => {
    Comment.create({
      videoid: req.params.id,
      timing: req.body.timing,
      sugsub: req.body.sugsub,
      reason: req.body.reason
      // user: ...
    }, function (err, output) {
      if (err) {
        console.log(err)
      }
      res.redirect('/videos/' + req.params.id)
    })
  }
// app.post('/animals', isNotLoggedIn, function (req, res, next) {
//   Animal.create(req.body.animals, function (err, output) {
//     if (err) {
//       if (err.name === 'ValidationError') {
//         let errMessages = []
//         for (field in err.errors) {
//           errMessages.push(err.errors[field].message)
//         }
//
//         console.log(errMessages)
//
//         req.flash('flash', {
//           type: 'danger',
//           message: errMessages
//         })
//         res.redirect('/animals')
//       }
//
//       return next(err)
//     }
//     req.flash('flash', {
//       type: 'success',
//       message: 'Created an animal with name: ' + output.name
//     })
//     res.redirect('/animals')
//   })
// }))
}

module.exports = commentController
