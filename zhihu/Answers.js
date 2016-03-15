/**
 * Created by jeff on 16/2/22.
 */
var request = require('superagent')
var cheerio = require('cheerio')
var Answer = require('./db').AnswerModel
var config = require('./config')

function getUserTopAnswers(userId, page) {
  request
    .get(config.url.userTopAnswers.replace('{userId}',userId).replace('{page}',page))
    .set('Cookie', config.headers.Cookie)
    .end(function(err, res) {
      if (err) console.log(err)
      var $ = cheerio.load(res.text, {decodeEntities: false})
      $answers = $('#zh-profile-answer-list').find('.zm-item')
      $answers.each(function(index, answer) {
        var $answer = $(answer)
        var agrees = Number($answer.find('.count').html())
        var $summary = $answer.find('.zh-summary')
        $summary.find('.toggle-expand').remove()
        var brief = $summary.html()
        console.log({
          agrees: agrees,
          brief: brief
        })
      })


    })
}
getUserTopAnswers('wang-mou-mou-34', 1)