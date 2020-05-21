/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-16 18:33:13
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 03:13:17
 * @Description: Description
 */

'use strict';

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const config = require('config');
const router = require('./app/router');
const session = require('koa-session');
const app = new Koa();
const mongodb = require('./app/utils/db');
const apiLog = require('./app/middleware/apiLog');
const loginCheck = require('./app/middleware/loginCheck');

// 连接数据库
mongodb.connect();

// 全局错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(apiLog);
app.use(loginCheck);
app.keys = config.sessionSignedKey;
app.use(session(config.sessionConfig, app));

app.use(bodyparser());
// 跨域
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config.port);
console.log(`////////////////////////////////////////////////////
//\tserver start at port ${config.port}
//\tlog file path: ${config.logConfig.path}
//\tmongodb connect to ${config.mongodbConfig.db} database
////////////////////////////////////////////////////
`);

process.on('SIGINT', function () {
    console.log('关闭数据库连接');
});
