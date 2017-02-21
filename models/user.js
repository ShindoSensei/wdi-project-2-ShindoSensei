const bcrypt = require('bcrypt') // to hash passwords
const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  local: {
    email: {type: String, unique: true},
    password: {type: String}
  }
})

UserSchema.statics.encrypt = function (password) { // static method created for user schema, so can use it in the passportConfig.js by User . See the line User.encrypt(password)
  return bcrypt.hashSync(password, 10) // default value of 10 if left blank
}

UserSchema.methods.validPassword = function (givenpassword) {
  return bcrypt.compareSync(givenpassword, this.local.password) // returns true or false, by comparing givenpassword which hashed password stored in database
}

module.exports = mongoose.model('User', UserSchema)
