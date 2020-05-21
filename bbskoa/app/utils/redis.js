/*
 * @Author: AsudGit
 * @Email: 1090961203@qq.com
 * @Date: 2020-04-28 02:11:54
 * @Last Modified by: AsudGit
 * @Last Modified time: 2020-04-28 16:25:13
 * @Description: redis数据库连接
 */
'use strict';
const Redis = require('ioredis');
const config = require('config').redisConfig;
// const config = {
//     port: 6379, // Redis port
//     host: '127.0.0.1', // Redis host
//     keyPrefix: 'bbskoa:', // 存诸前缀
//     // eslint-disable-next-line no-magic-numbers
//     ttl: 60 * 60 * 23, // 过期时间
//     family: 4, // 4 (IPv4) or 6 (IPv6)
//     db: 0,
//     password: 'bohee12345',
// };


const redis = new Redis(config);

module.exports = redis;
