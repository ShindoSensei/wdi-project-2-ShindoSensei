var mongoose = require('mongoose')
var CommentSchema = new mongoose.Schema({
  videoid: {
    type: String, required: [true, 'No video id!']
  },
  timingmin: {
    type: String, required: [true, 'No timing entered!']
  },
  timingsec: {
    type: String, required: [true, 'No timing entered!']
  },
  sugsub: {
    type: String, required: [true, 'No suggested subs entered!']
  },
  reason: {
    type: String, required: [true, 'No reason entered!']
  },
  upvote: {type: Number},

  upvotedusers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
