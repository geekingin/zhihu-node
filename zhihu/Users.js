var cheerio = require('cheerio')
// superagent chinese doc https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
var request = require('superagent')
var qs = require('qs')
var db = require('./db')
var config = require('./config')


var User = db.UserModel

getFollowees()

function getFollowees() {
  // todo findAndUpdate 10
  User.find({ crawled:0 }, null, { sort:{ agrees: -1 }, limit: 1 }, function(err, doc) {
    var user = doc[0]
    console.log('%s 赞%d 被关注%d 关注了%d 回答了%d /%s', user.name, user.agrees, user.followers, user.followees, user.answers, user.id)
    user.crawled = 1
    user.save(function(err, user){
      if (err) {
        console.log(err)
        getFollowees()
        return
      }

      getNextFollowees(user, 0)
    })
  })
}


function getNextFollowees(user, offset) {
  console.time()
  request
    .post(config.url.followees)
    .set(config.headers)
    .send(qs.stringify({
      'method': 'next',
      'params': JSON.stringify({'offset': offset, "order_by": "created", "hash_id": user.hash}),
      '_xsrf': config._xsrf
    }))
    /**  @param res.body.msg */
    .end(function (err, res) {
      if (err) {
        console.log(err)
        setTimeout(function(){
          getNextFollowees(user, offset)
        },1000)
        return
      }
      var msg = res.body.msg
      if (msg.length !== 0) {
        msg.forEach(saveUser)
        getNextFollowees(user, offset + msg.length)
      } else {
        User.findByIdAndUpdate(user._id, {$set: {crawled: 2, followees: offset + msg.length}}, function () {
          getFollowees()
        })
      }
    })
}
function saveUser(card) {
  var $ = cheerio.load(card, {decodeEntities: false})
  var $details = $('.details a')
  var id = $('.zm-item-link-avatar').attr('href').split('/')[2]
  User.findOne({id: id}, function (err, user) {
    if (user) {
      return
    }

    var brief = {
      name: $('.zm-list-content-title a').html(),
      id: id,
      hash: $('.zm-rich-follow-btn').attr('data-id'),
      intro: $('.zg-big-gray').html(),
      followers: Number($details.eq(0).html().split(' ')[0]),
      questions: Number($details.eq(1).html().split(' ')[0]),
      answers: Number($details.eq(2).html().split(' ')[0]),
      agrees: Number($details.eq(3).html().split(' ')[0]),
      crawled: false
    }
    User.create(brief)
  })
}

