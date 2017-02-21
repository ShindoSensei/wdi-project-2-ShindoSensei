let Comment = require('../models/comment')

let commentController = {

  show: (req, res) => {
    Comment.find({videoid: req.params.id}, function (err, doc) {
      if (err) {
        throw err
      }
      res.render('videos/show', {
        videoId: req.params.id,
        submittedArray: doc
      })
    })
  },

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
  },

  edit: (req, res) => {
    var updatedObject = {}
    if (req.body.name === 'timing') {
      updatedObject = {timing: req.body.value}
    } else if (req.body.name === 'sugsub') {
      updatedObject = {sugsub: req.body.value}
    } else if (req.body.name === 'reason') {
      updatedObject = {reason: req.body.value}
    }
    Comment.findByIdAndUpdate(req.query.commentid,
      updatedObject,
       {new: true}, function (err, output) {
         if (err) {
           throw err
         }
         console.log(req)
         console.log('Edited comment of id:' + req.query.commentid)
        //  console.log(req)
         res.redirect('/videos/' + req.params.id)
       })
  },

  delete: (req, res) => {
    Comment.findByIdAndRemove(req.query.commentid, function (err, output) {
      if (err) {
        throw err
      }
      console.log('Deleted comment of id:' + req.query.commentid)
      res.redirect('/videos/' + req.params.id)
    })
  }

  // app.delete('/animals/:id', isNotLoggedIn, function (req, res, next) {
  //   Animal.findByIdAndRemove(req.params.id, function (err, output) {
  //     if (err) return next(err)
  //     req.flash('flash', {
  //       type: 'warning',
  //       message: 'Deleted an animal'
  //     })
  //     res.redirect('/animals')
  //   })
  // })
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
