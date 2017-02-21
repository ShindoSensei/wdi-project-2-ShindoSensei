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
}

module.exports = commentController
