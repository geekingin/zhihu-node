var db = require('./zhihu/db')
var User = db.UserModel

User.create({
  id: 'excited-vczh'
},function(err,doc){
  console.log(err,doc)
})