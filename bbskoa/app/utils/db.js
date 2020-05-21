/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-18 22:52:53
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 01:49:25
 * @Description: mongodb数据库连接池
 */
'use strict';

const mongoose = require('mongoose');
const config = require('config').mongodbConfig;
const url = `mongodb://${config.host}:${config.port}/${config.db}`;


module.exports = {
    connect () {
        const db = mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: config.poolSize,
            auth: {'authSource': 'admin'},
            user: config.user,
            pass: config.pwd,
        });
        db.then(() => {
            console.log('mongodb connect success');
        }).catch(() => {
            console.error('连接错误');
        });
    },
};
