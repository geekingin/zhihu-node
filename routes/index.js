require('../zhihu/Users')

//var request = require('request')
//var zlib = require('zlib')
//function getUserInfo(name) {
//    request({
//        url: 'https://www.zhihu.com/node/ProfileFolloweesListV2',
//        headers: {
//            'Accept-Language': 'zh-CN',
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
//            'Connection': 'Keep-Alive',
//            'Cookie': 'z_c0="QUFEQW1Ed2FBQUFYQUFBQVlRSlZUWDdGN0ZhOVQ3bllnQ2xMOG1wODllZHdFU29zZ1EwQzh3PT0=|1455765630|8b6feef5d9da59798e260272136daa94ff5734e2";'
//        },
//        encoding: null,
//        timeout: 15000,
//        body: 'method=next&params=%7B%22offset%22%3A20%2C%22order_by%22%3A%22created%22%2C%22hash_id%22%3A%220970f947b898ecc0ec035f9126dd4e08%22%7D&_xsrf=061a6f97dfb15cde80f5bcb8886db620'
//    }, function(error, response, data) {
//        console.log(data);
//        var buffer = new Buffer(data);
//        var encoding = response.headers['content-encoding'];
//        console.log(encoding);
//        switch (encoding) {
//            case 'gzip':
//                zlib.gunzip(buffer, function(err, decoded) {
//                    console.log('gziping')
//                    console.log(decoded,1)
//                });
//                break
//            case 'deflate':
//                zlib.inflate(buffer, function(err, decoded) {
//                    console.log(decoded)
//                });
//                break
//            default:
//                //console.log(buffer.toString())
//        }
//        //console.log(response);
//    })
//}
//getUserInfo('excited-vczh');
//





module.exports = function(req, res) { res.send('crawing') }
//var myUtil = require('../myUtil')
//var $ = require('cheerio')
//var i = 0;
//
//module.exports = function(req, res) {res.send('crawing')};
//
//function a() {
//    var url = 'https://www.zhihu.com/question/38836382'
//    console.log(url)
//    myUtil.get(url, function(content, status) {
//        console.log(i++)
//        console.log('status:=' + status)
//        var movie = {}
//        movie.name = $(content).find('.zm-item-title.zm-editable-content').text()
//        movie.director = $(content).find('.zg-gray-normal strong').text()
//        console.log(movie);
//    })
//}
//
//
//var zhihu = require('zhihu')
//
//zhihu.User.getUserByName('JeffJing').then(function(user) {
//    console.log(user);
//})