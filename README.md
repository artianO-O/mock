## vue+mockjs+express搭建本地mock数据

### 基础环境

- node的安装 https://www.runoob.com/nodejs/nodejs-install-setup.html
- express (express框架): **npm install express -g**
- express-generator (express项目生成插件): **npm install express-generator -g**



### 创建express项目

1.在指定路径下打开命令行，输入**express mock**,即可生成名为 **mock** 的项目

2.**cd mock**       // 进入项目

3.**npm install**  // 补全项目依赖

4.**npm install mockjs**  // 安装mockjs插件



### 创建接口服务+运行express

1.打开app.js文件

```javascript
...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mockRouter = require('./routes/mock'); // 新增
...
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mock',mockRouter);  // 新增

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
```



2.在/routes目录下新建文件mock.js

```javascript
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
```

其中涉及mockjs的语法请查阅文档：http://mockjs.com/examples.html



3.命令行输入 npm run start启动项目

浏览器输入：http://127.0.0.1:3000/mock/chartdata



跨域问题：

修改app.js

```javascript

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mockRouter = require('./routes/mock');

var app = express();

// 新增 设置允许跨域 须设置在所有请求前
app.all('*', function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
...
```



### node热启动

1.npm install hotnode -g 

2.打开项目目录下的package.json, 更改scripts:

```javascript
改前 "start": "node ./bin/www"
改后 "start": "hotnode ./bin/www"
```

可能会出现异常：
![0T07Ss.png](https://s1.ax1x.com/2020/10/15/0T07Ss.png)

解决方法:https://blog.csdn.net/qq_38734862/article/details/105127598


