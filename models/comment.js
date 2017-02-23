var mongoose = require('mongoose')
var CommentSchema = new mongoose.Schema({
  videoid: {
    type: String, required: [true, 'No video id!']
  },
  timing: {
    type: String, required: [true, 'No timing entered!']
  },
  sugsub: {
    type: String, required: [true, 'No suggested subs entered!']
  },
  reason: {
    type: String, required: [true, 'No reason entered!']
  },
  upvote: {type: Number},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
//upvoteusers:[] array of user objects that have upvoted
})

var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
