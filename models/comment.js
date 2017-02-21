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
  }
  // user:...

})

// AnimalSchema.virtual('breedFamily').get(function () {
//   return this.breed + ' ' + this.family
// })
//
// AnimalSchema.virtual('member_since').get(function () {
//   return this.dob.getFullYear()
// })
//
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
