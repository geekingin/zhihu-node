var db = require('./zhihu/db')
var User = db.UserModel
//User.find({},'-_id name agrees followers',function(err,doc) {
//  console.log(doc);
//}).sort({agrees:-1}).limit(10)

User.findOne({name:'vczh'},function(err,doc) {
  console.log(doc)
  doc.crawled = 3
  doc.save(function(err,doc,doc2){
    console.log(err)
    console.log(doc)
    console.log(doc2)
  })
})
