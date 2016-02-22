/**
 * Created by jeff on 16/2/21.
 */
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/zhihu')

var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  id: String,
  hash: String,
  intro: String,
  followers: Number,
  followees: Number,
  questions: Number,
  answers: Number,
  agrees: Number,
  crawled: Number
})
// add a findAndModify method for mongoose which it dosen't support
userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
}

var UserModel = mongoose.model('UserModel', userSchema, 'user')

module.exports = {
  UserModel: UserModel
}