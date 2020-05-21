/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-17 19:48:10
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-05-01 17:46:51
 * @Description: 默认配置
 */
'use strict';

const port = 80;

const sessionSignedKey = ['bbskoa_20200417'];

const sessionConfig = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    // 只有服务器端可获取cookie
    httpOnly: true,
    signed: true,
    // 每次访问都重新设置cookie
    rolling: false,
    // 在每次访问快要过期时才重新设置cookie
    renew: true,
};

const mongodbConfig = {
    user: 'admin',
    pwd: 'rootadmin',
    db: 'comment',
    host: '127.0.0.1',
    port: '27017',
    poolSize: 10,
};

const redisConfig = {
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    keyPrefix: 'bbskoa:', // 存诸前缀
    // eslint-disable-next-line no-magic-numbers
    // ttl: 60 * 60 * 23, // 过期时间
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 0,
    password: 'bohee12345',
};

const logConfig = {
    path: 'D://BBSlogs',
};

// bcrypt的盐加密次数
const saltRounds = 10;


module.exports = {
    port,
    sessionSignedKey,
    sessionConfig,
    mongodbConfig,
    logConfig,
    saltRounds,
    redisConfig,
};
