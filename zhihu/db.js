/**
 * Created by jeff on 16/2/21.
 */
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/zhihu')

var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  gender: Number,
  id: {type: String, unique: true, index: true},
  hash: String,
  intro: String,
  followers: Number,
  followees: Number,
  questions: Number,
  answers: Number,
  agrees: Number,
  crawled: Number
}, {strict: true})

var answerSchema = new Schema({
  id: {type: Number, unique:true, index: true},
  agrees: Number,
  userName: String,
  userId: Schema.Types.ObjectId,
  hasRead: Boolean,
  myRank: Number,
  publishTime: Date,
  updateTime: Date
})

// add a findAndModify method for mongoose which it dosen't support
userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
}

var UserModel = mongoose.model('UserModel', userSchema, 'user')
var AnswerModel = mongoose.model('AnswerModel', answerSchema, 'answer')


UserModel.on('index', function(err) {
  if (err) console.log(err);
})

AnswerModel.on('index', function(err) {
  err && console.log(err)
})

module.exports = {
  UserModel: UserModel,
  AnswerModel: AnswerModel
}