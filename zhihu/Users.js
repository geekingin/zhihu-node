var cheerio = require('cheerio')
// superagent chinese doc https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
var request = require('superagent')
var qs = require('qs')
var db = require('./db')
var config = require('./config')

var User = db.UserModel

var list = [];

function getFollowees() {
  User.findOneAndUpdate({
    crawled: 0, 
    agrees: {
      $gt: 100
    }
  }, {
    $set: {
      crawled: 1
    }
  }, function (err, user) {
    if (err) {
      console.log(err)
      return
    }
    console.log('%s 赞%d 被关注%d 回答了%d %s %s', user.name, user.agrees, user.followers, user.followees, user.answers, user.id, (user.gender ? (user.gender == 2 ? '男' : '女') : ''))
    getNextFollowees(user, 0)
  })
  // 找不到好的办法减轻数据库压力
  // 之前的想法是一次读取 n 个数据存入内存,并设置正在抓取的状态(crawled:1)
  // 后来发现mongodb 无法一次修改 n 个数据,要么只能修改一个, 要么全部修改.
  // 老代码暂时留在这里,以后想办法.
  //if (!list.length) {
  //  User.update({crawled: 0}, {$set: {crawled: 1}}, {sort: {agrees: -1}, multi:true, limit: LIMIT}, function (err, result) {
  //    if (err) {
  //      console.log(err)
  //      return
  //    }
  //    console.log(result)
  //    User.find({crawled: 1}, '', {sort: {agrees: -1}, limit: LIMIT}, function (err, docs) {
  //      if (err) {
  //        console.log(err)
  //        return
  //      }
  //      list = docs;
  //      getFollowees()
  //    })
  //  })
  //  return
  //}
  //
  //var user = list.shift();
  //console.log('%s 赞%d 被关注%d 关注了%d 回答了%d /%s', user.name, user.agrees, user.followers, user.followees, user.answers, user.id)
  //user.crawled = 1
  //user.save(function (err, user) {
  //  if (err) {
  //    console.log(err)
  //    return
  //  }
  //  getNextFollowees(user, 0)
  //})
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
    .end(function (err, res) {
      /**  @param res.body.msg */
      if (err) {
        console.log(err)
        setTimeout(function () {
          getNextFollowees(user, offset)
        }, 1000)
        return
      }
      var msg = res.body.msg
      if (msg.length !== 0) {
        msg.forEach(saveUser)
        getNextFollowees(user, offset + msg.length)
      } else {
        user.crawled = 2
        user.followees = offset + msg.length
        user.save(getFollowees)
      }
    })
}
function saveUser(card) {
  var $ = cheerio.load(card, {decodeEntities: false})
  var $details = $('.details a')
  var $followBtn = $('.zm-rich-follow-btn')
  var followBtnText = $followBtn.html()
  try {

    var brief = {
      name: $('.zm-list-content-title a').html(),
      gender: /他/.test(followBtnText) ? 2 : (/她/.test(followBtnText) ? 1 : 0),
      id: $('.zm-item-link-avatar').attr('href').split('/')[2],
      hash: $followBtn.attr('data-id'),
      intro: $('.zg-big-gray').html(),
      followers: Number($details.eq(0).html().split(' ')[0]),
      questions: Number($details.eq(1).html().split(' ')[0]),
      answers: Number($details.eq(2).html().split(' ')[0]),
      agrees: Number($details.eq(3).html().split(' ')[0]),
      crawled: 0
    }
  } catch (e) {
    console.log($('.zm-list-content-title a').html())
    console.log($('.zm-item-link-avatar').html())
  }

  User.create(brief, function (err, doc) {
  })
}

//function getUserDetailProfile(userId) {
//  request(config.url.people)
//}


var LIMIT = 6
for (var i = 0; i < LIMIT; i++) {
  setTimeout(getFollowees, 500 * i)
}
