//var cookie = 'q_c1=14839963558940c6b910bdec9bdcb9a9|1455765599000|1455765599000; cap_id="YjJlNzc2ZTcyM2IyNDI4ZWFhN2MyOTI5MzRhNjE0ZTQ=|1455765599|4ebc56310eead16fdae20546510002d5be75d175"; _za=9bfb8121-2f6f-4554-908a-55cab6c399bc; z_c0="QUFEQW1Ed2FBQUFYQUFBQVlRSlZUWDdGN0ZhOVQ3bllnQ2xMOG1wODllZHdFU29zZ1EwQzh3PT0=|1455765630|8b6feef5d9da59798e260272136daa94ff5734e2"; n_c=1; _xsrf=061a6f97dfb15cde80f5bcb8886db620; aliyungf_tc=AQAAAOTf7R/zMQUAuImQdWEzxHveMQ/V; _ga=GA1.2.2125718837.1455878150; __utmt=1; __utma=51854390.2125718837.1455878150.1455948850.1455951436.3; __utmb=51854390.29.9.1455953811508; __utmc=51854390; __utmz=51854390.1455951436.3.3.utmcsr=xia.bigertech.com|utmccn=(referral)|utmcmd=referral|utmcct=/collection/c92f362e-8611-48f0-a8b2-0d729f2f0d0d; __utmv=51854390.100--|2=registration_date=20130129=1^3=entry_date=20130129=1; q_c1=14839963558940c6b910bdec9bdcb9a9|1455765599000|1455765599000; _za=9bfb8121-2f6f-4554-908a-55cab6c399bc; _xsrf=061a6f97dfb15cde80f5bcb8886db620; aliyungf_tc=AQAAAOTf7R/zMQUAuImQdWEzxHveMQ/V; _ga=GA1.2.2125718837.1455878150; _alicdn_sec=56c9ac64654445ade3e2d7eb6d6fe5ba43c6f85b; __utmt=1; cap_id="ZTQ2NjQwZTJhOTY0NDAwNzljZjlhM2Y2NmRmZWJjNjM=|1456073272|9310ad84d3cd5dc9d84ddd8a0dbe418d86a06ade"; z_c0="QUJDTTZZa0JmUWtYQUFBQVlRSlZUVDkzOFZZaDdOSUlnOWZNemZpcFZkWUZCTnBLLUNLWWdBPT0=|1456073279|5c3646dfcb3bd52995dcc93d33e7644e0cd197a4"; unlock_ticket="QUJDTTZZa0JmUWtYQUFBQVlRSlZUVWZ4eVZiMXo4Ml9PZ0lDdGRfTGtTZmdoQ2VzWk1OeGV3PT0=|1456073279|13d8f830fc3f6866a6295b79f52c31ebc04b8269"; n_c=1; __utma=51854390.2125718837.1455878150.1456071058.1456071058.1; __utmb=51854390.71.9.1456072298999; __utmc=51854390; __utmz=51854390.1456071058.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-2|2=registration_date=20160218=1^3=entry_date=20160218=1'
var config = {
  url: {
    zhihu: 'http://www.zhihu.com',
      people: 'http://www.zhihu.com/people/',
      followees: 'https://www.zhihu.com/node/ProfileFolloweesListV2'
  },
  headers: {
    'Accept-Language': 'zh-CN',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
      'Connection': 'Keep-Alive',
      'Cookie':cookie + '_xsrf=' + _xsrf
  },
  _xsrf: _xsrf
}
module.exports = config