var secret = require('./secret.js')

var config = {
  url: {
    zhihu: 'http://www.zhihu.com',
    people: 'http://www.zhihu.com/people/',
    userTopAnswers: 'http://www.zhihu.com/people/{userId}/answers?order_by=vote_num&page={page}',
    followees: 'https://www.zhihu.com/node/ProfileFolloweesListV2'
  },
  headers: {
    'Accept-Language': 'zh-CN',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
    'Connection': 'Keep-Alive',
    'Cookie': secret.cookie + '_xsrf=' + secret._xsrf
  },
  _xsrf: secret._xsrf
}
module.exports = config