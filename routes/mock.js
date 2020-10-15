//服务端响应代码片段/routes/mock.js:
//业务逻辑为查询系统告警信息列表
//node服务器启动后，请求地址为:127.0.0.1:3000/mock/chartdata
//3000端口为express默认启动端口

var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

router.get('/chartdata', function (req, res, next) {
  var data =Mock.mock({
      'list|10':[{
            'time|+1': ['周一','周二','周三','周四','周五'],
            'value|200-5000':1,
            'type|+1': ['蒸发量','降水量'],
        }] 
      });

  res.send(JSON.stringify({
    meta : {
      message: 'success'
    },
    status:true,
    data: data.list
  }))
})
module.exports = router;